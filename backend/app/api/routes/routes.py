from fastapi import APIRouter # type: ignore
from app.api.routes import user, country, admin

router = APIRouter()
router.include_router(user.router)
router.include_router(country.router)
router.include_router(admin.router)

@router.get("/")
def root():
    return {"message": "Welcome to the Secure Country Middleware API"}

@router.get("/")
def root():
    return {"message": "Welcome to the Secure Country Middleware API"}