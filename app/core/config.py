from pydantic import BaseSettings # type: ignore

class Settings(BaseSettings):
    secret_key: str
    database_url: str
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
