from pydantic import BaseModel
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class UserData(BaseModel):
    total_days: str
    destination: str
    travel_type: str
 

class TextData(BaseModel):
    inputData: str

llm = ChatOpenAI(
    model="openai/gpt-4o-mini",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost",
        "X-Title": "LangGraph Travel Planner"
    },
    temperature=0.7,
    max_tokens=3000,
)

text_llm = ChatOpenAI(
    model="openai/gpt-4o-mini",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost",
        "X-Title": "LangGraph Travel Planner"
    },
    temperature=0.7,
    max_tokens=200,
)

