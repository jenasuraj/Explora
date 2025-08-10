from llm_workflow.state.state import State
from langchain.prompts import PromptTemplate
from models.user import groq_llm
from langchain_core.messages import HumanMessage, AIMessage

mainPrompt = """
User query:{user}.
You are a expert travel planner .
Your job is to check wheither the  user's query is relevant to information like travelling, planning etc? if yes then return 'approved' else return 'not approved'.
For ex: a user query like:'Hello/hii etc do not involve any planning and all so return 'not_approved'.make sure when you are returning 'not_approved', it should be strictly 'not_approved'.
For ex: a user query like:'i wanna go to best place/show me some best place or etc' sounds planning and trip so return 'approved'. 
"""
prompt = PromptTemplate.from_template(mainPrompt)
chain = prompt | groq_llm
def isValid(state:State):
    print("isValid Node entered --------->1")
    print("the state is",state)
    print("\n\n")
    user = state["messages"][-1].content 
    response = chain.invoke({"user":user})
    return{
        "valid":f"{response}"
          }
