
from llm_workflow.state.state import State
from langchain.prompts import PromptTemplate
from models.user import groq_llm
from langchain_core.messages import HumanMessage, AIMessage
import json
import re

def final(state: State):
    raw_response = state["messages"][-1].content
    match = re.search(r"```json\s*(.*?)\s*```", raw_response, re.DOTALL)
    if not match:
        raise ValueError("❌ No JSON block found in the input.")

    json_str_with_braces = match.group(1)
    json_str = json_str_with_braces.replace("{{", "{").replace("}}", "}")

    try:
        parsed_json = json.loads(json_str)
        stringified_output = json.dumps(parsed_json, indent=2)

        return {
            "messages": state["messages"] + [AIMessage(content=stringified_output)]
        }
    except json.JSONDecodeError as e:
        error_message = f"❌ JSON decoding failed: {str(e)}"
        print(error_message)
        return {
            "messages": state["messages"] + [AIMessage(content=error_message)]
        }
