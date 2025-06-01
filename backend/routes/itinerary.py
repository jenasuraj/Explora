from fastapi import APIRouter
from models.user import UserData,TextData
from services.langgraph_chain import graph
from services.langgraph_text import text_graph
from models.user import text_llm
from langchain_core.messages import HumanMessage


router = APIRouter()

@router.post("/")
async def receive(data: UserData):
    initial_state = {
        "destination": data.destination,
        "total_days": data.total_days,
        "travel_type": data.travel_type
    }
    result = graph.invoke(initial_state)
    return result


@router.post("/submit")
async def receive(data: TextData):
    userQuery = data.inputData
    initial_state = {
        "messages":[HumanMessage(content=userQuery)]
    }
    result = text_graph.invoke(initial_state)
    print("text-result",result["messages"][-1].content)
    response = result["messages"][-1].content
    return response
    

   
