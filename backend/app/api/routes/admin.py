from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy.orm import Session # type: ignore
from app.core.security import get_current_user
from app.database.models import User
from app.database.db import get_db

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users")
def get_all_users(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.email != "admin@example.com":
        raise HTTPException(status_code=403, detail="Admins only.")

    users = db.query(User).all()
    return [
        {
            "email": u.email,
            "username": u.username,
            "api_key": u.api_key,
            "api_key_usage_count": u.api_key_usage_count,
            "api_key_last_used": u.api_key_last_used,
        }
        for u in users
    ]
