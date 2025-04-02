from fastapi import FastAPI # type: ignore
from app.api.routes import router
from app.core.config import settings

app = FastAPI(
    title="Secure Country Middleware API",
    version="1.0",
    description="REST API Middleware for RestCountries.com",
)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "env": "loaded",
        "db": settings.database_url,
    }

app.include_router(router)
