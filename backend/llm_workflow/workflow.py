from langgraph.graph import StateGraph, START, END
from models.user import llm,groq_llm 
from dotenv import load_dotenv
from llm_workflow.state.state import State
load_dotenv()
from  llm_workflow.nodes.isvalid import isValid
from  llm_workflow.nodes.planner import planner
from  llm_workflow.nodes.elaborate import elaborate
from llm_workflow.nodes.final import final


def routerFunction(state:State):
    if "approved" in state["messages"][-1].content:
        return "verified"
    else:
        return "not_verified"



graph_builder = StateGraph(State)
graph_builder.add_node("isValid",isValid)
graph_builder.add_node("planner", planner)
graph_builder.add_node("elaborate", elaborate)
graph_builder.add_node("final", final)

graph_builder.add_edge(START, "isValid")
graph_builder.add_conditional_edges("isValid",routerFunction,{
  "verified":"planner","not_verified":END
})
graph_builder.add_edge("planner","elaborate")
graph_builder.add_edge("elaborate","final")
graph_builder.add_edge("final",END)
graph = graph_builder.compile()