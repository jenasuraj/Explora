from llm_workflow.state.state import State
from langchain.prompts import PromptTemplate
from models.user import groq_llm,llm
from langchain_core.messages import HumanMessage, AIMessage

elaborate_prompt = """
You are a data structuring assistant. Your task is to convert the given human-readable travel itinerary into a clean, well-formatted JSON object for frontend consumption.

=====================
📌 Approach to Follow:
=====================
1. Carefully identify the starting point of the trip.
2. Break the itinerary into individual days (Day 1, Day 2, etc.).
3. For each day:
   - Extract the list of **places visited**, each with:
     - `name`: full name (include city, state, country)
     - `description`: **minimum 50–60 words**, highlighting charm, significance, and experience
     - `distance_from_previous_km`: number (use `null` for first place)
   - Create a `plan` that **aligns strictly with the listed places**:
     - Match **each time block** to a relevant place logically from the `places` list
     - Use the flow of visit to assign:
       - `breakfast` → near/related to first place
       - `morning_activity` → first place
       - `lunch` → near/related to second place
       - `afternoon_activity` → second place
       - `evening` / `dinner` / `night_activity` → subsequent places or end-of-day locations

4. Extract `total_distance_km`: sum of distances between all places.
5. Add a `return_route` that describes how the user can return from the final place of the trip, ideally mentioning transport availability (e.g., “Return from San Francisco via SFO Airport”).
6. Include 3–5 travel `tips` (as a list of helpful strings).
7. Do not duplicate any place.
8. Wrap the output inside a ```json fenced code block.

=======================
📦 Output JSON Template:
=======================
```json
{{
  "starting_point": "San Francisco, California, USA",
  "days": [
    {{
      "day": "Day 1",
      "places": [
        {{
          "name": "Golden Gate Bridge, San Francisco, California, USA",
          "description": "An internationally recognized symbol of San Francisco, the Golden Gate Bridge is a breathtaking feat of engineering. Spanning 2.7 km, the bridge offers sweeping views of the bay, Alcatraz, and the Pacific Ocean. It's a favorite spot for photos, walks, and bike rides.",
          "distance_from_previous_km": null
        }},
        {{
          "name": "Alcatraz Island, San Francisco, California, USA",
          "description": "Once home to America’s most notorious criminals, Alcatraz is now a historic national park. Visitors can explore the old prison, learn about its infamous inmates, and take in panoramic views of the city from the island.",
          "distance_from_previous_km": 4.5
        }},
        {{
          "name": "Fisherman's Wharf, San Francisco, California, USA",
          "description": "A lively waterfront district famous for its seafood, street performances, and shops. Fisherman's Wharf is perfect for strolling, dining, and soaking in the maritime atmosphere.",
          "distance_from_previous_km": 2.5
        }}
      ],
      "plan": {{
        "breakfast": "Enjoy a local breakfast at a café near the Golden Gate Bridge before starting your walk.",
        "morning_activity": "Visit the Golden Gate Bridge and walk across its span while taking photos.",
        "lunch": "Have lunch at a seafood stall after your ferry ride to Alcatraz Island.",
        "afternoon_activity": "Take a guided tour of Alcatraz Island and explore the historic prison and museum.",
        "evening": "Head to Fisherman's Wharf for souvenir shopping and bay views.",
        "dinner": "Dine on clam chowder or crab at one of Fisherman's Wharf's famous eateries.",
        "night_activity": "Walk along the waterfront or visit Ghirardelli Square for dessert before returning to your hotel."
      }}
    }}
  ],
  "total_distance_km": 7.0,
  "return_route": "Return from San Francisco via SFO International Airport or Union Square train terminal.",
  "tips": [
    "Book Alcatraz tickets at least a week in advance.",
    "Dress in layers — San Francisco weather changes quickly.",
    "Use public transportation or walking to avoid parking issues.",
    "Try the sourdough bread bowls at Fisherman's Wharf.",
    "Start early to avoid morning fog at the bridge."
  ]
}}


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


