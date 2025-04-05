from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods: GET, POST, etc.
    allow_headers=["*"],  # Allow all headers including Authorization
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
