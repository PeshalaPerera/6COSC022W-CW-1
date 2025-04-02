from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse
from app.database.db import SessionLocal
from app.database.models import User
from passlib.hash import bcrypt
import secrets

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user/email exists
    if db.query(User).filter((User.username == user.username) | (User.email == user.email)).first():
        raise HTTPException(status_code=400, detail="Username or Email already exists")

    # Hash password
    hashed_pw = bcrypt.hash(user.password)

    # Generate API Key
    api_key = secrets.token_hex(16)

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw,
        api_key=api_key,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
