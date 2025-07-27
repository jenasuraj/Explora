from langchain_core.tools import tool
from db.connection import get_connection
import mysql.connector

@tool
def sql(query: str) -> str:
    """
    Executes a SQL SELECT query on the 'travel-table' table in the database.

    The 'travel-table' table contains the following columns:
        - id: Unique identifier for each travel entry
        - days: Number of travel days
        - destination: Travel destination
        - type: Type of travel (e.g., adventure, leisure, business)

    Args:
        query (str): A SQL SELECT query string to retrieve travel data.

    Returns:
        str: Query result as a string, with each row formatted for readability.
    """
    if not query.strip().upper().startswith("SELECT"):
        return "Error: Only SELECT queries are allowed for fetching data."

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close()
        conn.close()

        if not results:
            return "No data found for the given query."

        formatted_results = [", ".join(f"{key}: {value}" for key, value in row.items()) for row in results]
        return "\n".join(formatted_results)

    except mysql.connector.Error as db_error:
        return f"Database error: {str(db_error)}"
    except Exception as e:
        return f"Error executing query: {str(e)}"