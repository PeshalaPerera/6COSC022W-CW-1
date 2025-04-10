from pydantic_settings import BaseSettings  # type: ignore
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    secret_key: str
    database_url: str
    access_token_expire_minutes: int = 30
    rest_countries_api: str 

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
