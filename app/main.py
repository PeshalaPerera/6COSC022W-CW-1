from fastapi import FastAPI # type: ignore
from app.api.routes import router

app = FastAPI(title="Secure Country Middleware API", version="1.0")

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(router)
