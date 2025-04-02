from fastapi import APIRouter # type: ignore

router = APIRouter()

@router.get("/")
def root():
    return {"message": "Welcome to the Secure Country Middleware API"}
