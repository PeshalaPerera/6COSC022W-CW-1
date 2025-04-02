from fastapi import FastAPI # type: ignore
from app.api.routes import router
from app.core.config import settings
from app.database.base import Base
from app.database.db import engine
from app.database import models

app = FastAPI(
    title="Secure Country Middleware API",
    version="1.0",
    description="REST API Middleware for RestCountries.com",
)

Base.metadata.create_all(bind=engine)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "env": "loaded",
        "db": settings.database_url,
    }

app.include_router(router)
