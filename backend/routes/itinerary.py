from fastapi import APIRouter
from models.user import UserData
from llm_workflow.workflow import graph
from langchain_core.messages import HumanMessage

router = APIRouter()

@router.post("/")
async def receive(data: UserData):
    print("data is",data.description)
    user_data = f"user wants:{data.description} for {data.days}, but the distance and plan should be happen within {data.radius}"
    initial_state = {
        "messages": [HumanMessage(content=user_data)],
                   }
    result = graph.invoke(initial_state)
    final_data = result["messages"][-1].content
    print("final data is",final_data)
    return {"final_data":final_data}
