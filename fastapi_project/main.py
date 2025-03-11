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
        print(f"Extracted city: {city}")

        PlaceUrl = f"https://api.unsplash.com/search/photos?query={city}&client_id=r0YgDi67MiER4cjEE5fSBaP-nh3i486kSpusedhnQ"
        Img_API_response = reqs.get(PlaceUrl)
       
        WeatherUrl = f"http://api.weatherapi.com/v1/current.json?key=3c068b755e474bc5360809251103&q={city}"
        Weather_response = reqs.get(WeatherUrl)
    



        if Img_API_response.status_code != 200:
            return f"Failed to fetch images for {city}, Status: {Img_API_response.status_code}"
        if Weather_response.status_code != 200:
            return f"Failed to fetch temperature for {city}, Status: {Weather_response.status_code}"



        Img_response_data = Img_API_response.json()
        Weather_response_data  =Weather_response.json()

 #


        first_image_url = Img_response_data["results"][0]["urls"]["full"]
        print(f"image url is {Img_response_data['results'][0]['urls']['full']}")

        first_weather_data = Weather_response_data["current"]["temp_c"]
        print(f"weather data is {Weather_response_data["current"]["temp_c"]}")
      

      
        return  {"weather":first_weather_data,"image":first_image_url}

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

    # Get the image URL and weather data from findData
    image_weather = findData(place_name)
    print(f"final data is  {image_weather}")

    # Check if image_weather is a dictionary or an error string
    if isinstance(image_weather, str):
        return {
            "error": image_weather,
            "place_name": place_name,
            "description": data.content,
        }

    image_url = extract_url(image_weather["image"])  # Ensure we only get the URL
    temperature = image_weather["weather"]

    print(f"Extracted image URL: {image_url}")
    print(f"Extracted place: {place_name}")
    print(f"Extracted temperature: {temperature}")

    return {
        "image_url": image_url,
        "place_name": FindCity(place_name),
        "description": data.content,
        "weather": temperature
    }
