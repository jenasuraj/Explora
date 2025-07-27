from llm_workflow.state.state import State
from langchain.prompts import PromptTemplate
from models.user import groq_llm,llm
from langchain_core.messages import HumanMessage, AIMessage


elaborate_prompt = """
You are a data structuring assistant. Your task is to convert the given human-readable travel itinerary into a clean, well-formatted JSON object for frontend consumption.

=====================
📌 Approach to Follow:
=====================
1. Carefully read and extract the starting point from the itinerary.
2. Parse the trip into individual days (e.g., Day 1, Day 2...).
3. For each day, extract the places visited. Each place should include:
   - name: string
   - description: 1-line summary
   - distance_from_previous_km: number (use null for the first place)
4. Extract the total distance of the trip, as mentioned in the summary.
5. Extract the return route (the travel instructions to return to origin).
6. Extract any available tips and structure them as a list of strings.
7. Remove redundant or repeated information.
8. The output must be strictly in the JSON format shown below.
9. Wrap the entire output inside a ```json fenced code block for easy parsing.

=======================
📦 Output JSON Template:
=======================
```json
{{
  "starting_point": "Bhubaneswar",
  "days": [
    {{
      "day": "Day 1",
      "places": [
        {{
          "name": "Bhubaneswar",
          "description": "Capital city with ancient temples.",
          "distance_from_previous_km": null
        }},
        {{
          "name": "Lingaraj Temple",
          "description": "11th-century temple with carvings.",
          "distance_from_previous_km": 5
        }}
      ]
    }},
    {{
      "day": "Day 2",
      "places": [
        {{
          "name": "Dhauli Hills",
          "description": "Buddhist rock edicts and scenic views.",
          "distance_from_previous_km": 10
        }}
      ]
    }}
  ],
  "total_distance_km": 90,
  "return_route": "To return to Bhubaneswar, take the highway from Puri (approx. 60 km, 1.5 hours).",
  "tips": [
    "Book accommodation in Bhubaneswar for 2 nights",
    "Try Odia cuisine like dalma and besara",
    "Relax at Puri beach or Chilika Lake"
  ]
  Important : Make sure the description in places should be atleast 50-60 words(its mandatory !), and also dont only add the name i.e place:Bhubaneshwar !its wrong. You better have to add the country name as well i.e ex: place:bhubaneshwar,india.
  User input:{input}.
}}"""

prompt = PromptTemplate.from_template(elaborate_prompt)
chain = prompt | groq_llm
def elaborate(state:State):
    print("Entered elaborate state -----------> 3")
    plan = state["messages"][-1].content
    response = chain.invoke({"input":plan})
    return{
        "messages":state["messages"]+[AIMessage(content=response.content)]
    }


