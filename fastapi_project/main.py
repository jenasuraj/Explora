from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import os
load_dotenv()


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserData(BaseModel):
    total_days : str
    destination: str
    travel_type: str

llm = ChatOpenAI(
    model="openai/gpt-4o-mini",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost",
        "X-Title": "LangGraph Travel Planner"
    },
    temperature=0.7,
   max_tokens=3000 , # or higher depending on your usage plan

)



class State(TypedDict):
    destination:str
    total_days:str
    travel_type:str
    final:str


graph_builder = StateGraph(State)


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
    response = chain.invoke({
        "destination":state["destination"],
        "total_days":state["total_days"],
        "travel_type":state["travel_type"]
    })
    print("data is ",response.content)
    return {"final":response.content}
   


graph_builder.add_node("chatbot", chatbot)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot",END)
graph = graph_builder.compile()


@app.post("/")
async def receive(data: UserData):
    print("date for",data.total_days)
    initial_state = {
        "destination": data.destination,
        "total_days": data.total_days,
        "travel_type": data.travel_type
    }
    result = graph.invoke(initial_state)
    return result

   

    