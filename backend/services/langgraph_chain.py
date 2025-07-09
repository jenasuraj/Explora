from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_core.prompts import PromptTemplate
from models.user import llm
from typing import Annotated
from langgraph.graph.message import add_messages
from langchain_core.messages import HumanMessage,AIMessage

"""
class State(TypedDict):
    destination: str
    total_days: str
    travel_type: str
    final: str

"""
class State(TypedDict):
    messages: Annotated[list, add_messages]


prompt = PromptTemplate.from_template("""
You are a travel planner. Create a detailed day-by-day itinerary for a {travel_type} trip to {destination} lasting {total_days} days.

Each day must include the following sections, with both the name and a short description for each:

- **Breakfast**
  - "Restaurant": Name of the recommended restaurant or café
  - "Description": A brief description about the place and why it's recommended

- **Morning Activity**
  - "Place": Name of the attraction or activity
  - "Description": A short background or reason to visit

- **Lunch**
  - "Restaurant": Name of the recommended restaurant
  - "Description": Short explanation of cuisine/type and reason to try it

- **Afternoon Activity**
  - "Place": Name of the location or experience
  - "Description": A brief explanation of what to do or see there

- **Dinner**
  - "Restaurant": Name of the dinner spot
  - "Description": Highlight what makes it a good choice for the evening

Return the itinerary as a JSON object structured like this:

{{
  "Day 1": {{
    "Breakfast": {{
      "Restaurant": "...",
      "Description": "..."
    }},
    "Morning Activity": {{
      "Place": "...",
      "Description": "..."
    }},
    "Lunch": {{
      "Restaurant": "...",
      "Description": "..."
    }},
    "Afternoon Activity": {{
      "Place": "...",
      "Description": "..."
    }},
    "Dinner": {{
      "Restaurant": "...",
      "Description": "..."
    }}
  }},
  ...
}}
""")

chain = prompt | llm

def chatbot(state: State):
  
    query = state["messages"][0].content
    print("the query is",query)
    response = llm.invoke(query)
    print("response is",response.content) 
    return {"messages":state["messages"]+[AIMessage(content=response.content)]}

graph_builder = StateGraph(State)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", END)
graph = graph_builder.compile()
