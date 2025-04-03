from fastapi import APIRouter # type: ignore
from app.api.routes import user
from app.api.routes import user, country

router = APIRouter()
router.include_router(user.router)
router.include_router(country.router)

@router.get("/")
def root():
    return {"message": "Welcome to the Secure Country Middleware API"}

@router.get("/")
def root():
    return {"message": "Welcome to the Secure Country Middleware API"}