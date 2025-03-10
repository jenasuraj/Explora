import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain.tools import Tool
from langchain.agents import initialize_agent, AgentType
import requests as reqs
import re

load_dotenv()

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

model = init_chat_model("mistralai/Mixtral-8x7B-Instruct-v0.1", model_provider="together")

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def FindCity(question):
    prompt = """
    User provided text: {city}.
    Extract only the name of the place and country from the text.
    Response like:  "place name,country" 
    """
    try:
        prompt = PromptTemplate.from_template(prompt)
        chain = prompt | model
        response = chain.invoke({"city": question})
        return response.content.strip()
    except Exception as e:
        return f"Error extracting city: {e}"

def findData(query):
    try:
        city = FindCity(query)
        #print(f"Extracted city: {city}")

        url = f"https://api.unsplash.com/search/photos?query={city}&client_id=r0YgDi67MiER4cKKjEE5fSBaP-nh3i486kSpusedhnQ"
        API_response = reqs.get(url)

        if API_response.status_code != 200:
            return f"Failed to fetch images for {city}, Status: {API_response.status_code}"

        response_data = API_response.json()
        if not response_data.get("results"):
            return f"No images found for {city}."

        first_image_url = response_data["results"][0]["urls"]["full"]
        return first_image_url

    except Exception as e:
        return f"Error: {e}"

tools = [
    Tool(
        name="resourceFinder",
        func=findData,
        description="Use this tool to find images of places. Return only the image URL."
    ),
]

agent = initialize_agent(
    tools,
    model,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

def extract_url(text):
    """Extract URL from text if present, otherwise return the original text"""
    url_pattern = r'https?://[^\s]+'
    match = re.search(url_pattern, text)
    return match.group(0) if match else text

@app.post("/")
async def read_root(request: QueryRequest):
    promptData = """
    You are a helpful travel AI assistant.
    User request :{request}.
    Based on the User request, suggest 1 best location with location name along with it's country.
    Just provide the place name along with it's country like for example 'tajmahal,india'
    """

    prompt = PromptTemplate.from_template(promptData)
    chain = prompt | model
    data = chain.invoke({"request": request.query})

    place_name = data.content.strip()
    print(f"AI Suggested Locations: {place_name}")

    # Get the image URL directly from findData
    image_url = findData(place_name)
    image_url = extract_url(image_url)  # Ensure we only get the URL


    print(f"Extracted image URL: {image_url}")
    print(f"Extracted place :{ place_name}" )
    return {
        "image_url": image_url,
        "place_name": FindCity(place_name),
        "description":data.content
    }
