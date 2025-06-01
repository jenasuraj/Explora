import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env.local")

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT", 3306)),
        connection_timeout=5,
        use_pure=True
    )