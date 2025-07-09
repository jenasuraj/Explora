from llm_workflow.state.state import State
from langchain.prompts import PromptTemplate
from models.user import groq_llm,llm
from langchain_core.messages import HumanMessage, AIMessage
from crewai import Agent, Crew, Task, Process


research_agent = Agent(
    role="Research Analyst",
    goal="Find and summarize information about specific topics",
    backstory="You are an experienced researcher with attention to detail",
    llm=llm,
    verbose=True
)

summarise_agent = Agent(
    role="Summarisation Analyst",
    goal="Summarize information briefly in 50 words",
    backstory="You are an experienced summariser",
    llm=llm,
    verbose=True
)

def planner(state: State):
    query = state["messages"][0].content
    research_task = Task(
        description=f"Research this topic: {query}",
        expected_output="A bullet list summary of the top 5 key points.",
        agent=research_agent
    )
    summariser_task = Task(
        description="Summarize the research output in 50 words.",
        expected_output="A brief, clear summary.",
        agent=summarise_agent
    )
    crew = Crew(
        agents=[research_agent, summarise_agent],
        tasks=[research_task, summariser_task],
        process=Process.sequential
    )
    result = crew.kickoff()
    pass 
