from pydantic import BaseModel
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from crewai import LLM
load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

groq_llm = ChatGroq(
    groq_api_key=groq_api_key,
    model="meta-llama/llama-4-scout-17b-16e-instruct"
)

class UserData(BaseModel):
    description: str
    days: str
    radius: str


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

llm = LLM(
    model="openrouter/openai/gpt-4o-mini",
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

