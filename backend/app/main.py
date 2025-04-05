from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from app.api.routes.routes import router
from app.core.config import settings
from app.database.base import Base
from app.database.db import engine
from app.database import models

app = FastAPI(
    title="Secure Country Middleware API",
    version="1.0",
    description="REST API Middleware for RestCountries.com",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
