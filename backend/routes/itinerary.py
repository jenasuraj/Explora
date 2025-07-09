from fastapi import APIRouter
from models.user import UserData
from services.langgraph_chain import graph
from models.user import text_llm
from langchain_core.messages import HumanMessage

router = APIRouter()

@router.post("/")
async def receive(data: UserData):
    print("data is",data.days)
    initial_state = {
        "messages": [HumanMessage(content=data.inputData)],
                   }
    result = graph.invoke(initial_state)
    return result
