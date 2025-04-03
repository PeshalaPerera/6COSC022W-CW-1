from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse
from app.database.db import SessionLocal
from app.database.models import User
from passlib.hash import bcrypt
import secrets
from app.core.config import settings
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.schemas.user import UserLogin, TokenResponse
from app.core.security import get_current_user

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

@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not bcrypt.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    to_encode = {
        "sub": db_user.email,
        "exp": datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes),
    }

    access_token = jwt.encode(to_encode, settings.secret_key, algorithm="HS256")

    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def get_logged_in_user(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/usage")
def get_api_key_usage(current_user: User = Depends(get_current_user)):
    return {
        "api_key": current_user.api_key,
        "usage_count": current_user.api_key_usage_count,
        "last_used": current_user.api_key_last_used
    }
