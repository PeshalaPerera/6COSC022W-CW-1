from fastapi import APIRouter # type: ignore
from app.api.routes import user

router = APIRouter()
router.include_router(user.router)

@router.get("/")
def root():
    return {"message": "Welcome to the Secure Country Middleware API"}
