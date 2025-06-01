from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from models.user import text_llm
from langgraph.prebuilt import tools_condition
from langgraph.prebuilt import ToolNode
from langchain_tavily import TavilySearch
from langchain_core.messages import SystemMessage,AIMessage
from dotenv import load_dotenv
from tools.sql import sql as sql_tool
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()


loader = PyPDFLoader(r"C:\Users\LENOVO\Downloads\Travel_App_RAG_Report_Suraj.pdf")
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size =100, chunk_overlap = 10)
spliited_text = text_splitter.split_documents(documents)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
vector_store = InMemoryVectorStore(embeddings)
ids = vector_store.add_documents(documents=spliited_text)
print("data added to v-db")
retriever = vector_store.as_retriever(search_kwargs={"k": 2})  


tavily_tool = TavilySearch(max_results=2)
tools = [tavily_tool,sql_tool]
llm_with_tools = text_llm.bind_tools(tools)



ALLOWED_TOPICS = ALLOWED_TOPICS = [
    "travel", "trip", "flight", "flights", "plan", "planning", "itinerary", "budget",
    "nature", "vacation", "holiday", "journey", "destination", "destinations", "greetings",
    "hello", "hi", "hey", "explore", "tour", "tourist", "tourism", "adventure", "hiking",
    "backpacking", "stay", "book", "booking", "accommodation", "resort", "hotel", "hotels",
    "beach", "mountain", "lake", "forest", "sunrise", "sunset", "places", "spots", "route",
    "airfare", "visa", "passport", "weather", "summer", "winter", "spring", "autumn",
    "monsoon", "season", "climate", "local food", "culture", "best", "worst", "cheap", "luxury",
    "safe", "safest", "expensive", "crowded", "peaceful", "romantic", "solo travel",
    "group travel", "honeymoon", "road trip", "abroad", "international travel", "domestic travel"
]


class State(TypedDict):
    messages: Annotated[list, add_messages]


def is_relevant_query(user_input: str) -> bool:
    lowered = user_input.lower()
    return any(topic in lowered for topic in ALLOWED_TOPICS)

def chatbot(state: State):
    user_input = state["messages"][-1].content
    if not is_relevant_query(user_input):
        system_response = "I'm here to help with travel-related queries only. Please ask something about travel, flights, or destinations."
        return {
            "messages": state["messages"] + [SystemMessage(content=system_response)]
        }
    ai_msg = llm_with_tools.invoke(state["messages"])
    return {
        "messages": state["messages"] + [ai_msg]
    }


def rag(state: State):
    #print("the state is",state["messages"])
    user_query = state["messages"][0].content
    rag_response = retriever.invoke(state["messages"][0].content)
    rag_response_modified ="\n\n".join([i.page_content for i in rag_response])
    print("rag response is --->",rag_response_modified)
    tool_or_llm_response = state["messages"][-1].content 
    system_prompt = (
        "You are a helpful assistant. Use the following context to answer the question:\n\n"
        f"The rag response is :{rag_response_modified}\n\n while the existing response by tools/llm is: {tool_or_llm_response}"
        "Now answer the user's question."
     )
    result = text_llm.invoke([
    {"role": "system", "content": system_prompt},
    {"role": "user", "content":user_query }
    ])
    return{
        "messages":state["messages"]+[AIMessage(content=result.content)]
    }


graph_builder = StateGraph(State)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("tools", ToolNode(tools))
graph_builder.add_node("rag", rag)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_conditional_edges("chatbot", tools_condition, {
    "tools": "tools",
    "__end__": "rag"
})
graph_builder.add_edge("rag", END)
graph_builder.add_edge("tools", "chatbot")

text_graph = graph_builder.compile()
