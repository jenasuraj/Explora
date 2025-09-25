from fastapi import APIRouter
from models.user import UserData
from llm_workflow.workflow import graph
from langchain_core.messages import HumanMessage

router = APIRouter()

@router.get("/")
async def health_check():
    return {"status": "ok", "message": "Backend is running 🚀"}

@router.post("/")
async def receive(data: UserData):
    print("data is",data.mixed_data)
    result =  graph.invoke(
    {"messages": [{"role": "user", "content": f"{data.mixed_data}"}]},
    {"configurable": {"thread_id": "1"}},
    )
    final_data = result["messages"][-1].content
    print("final data is",final_data)
    return {"final_data":final_data}


