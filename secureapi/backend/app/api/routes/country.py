from datetime import datetime
from multiprocessing import process
import os
from fastapi import APIRouter, Depends, HTTPException, Header # type: ignore
from sqlalchemy.orm import Session # type: ignore
from app.core.security import get_current_user
from app.database.models import User
from app.database.db import get_db
import requests
from app.core.config import settings

router = APIRouter(prefix="/countries", tags=["Countries"])

@router.get("/{name}")
def get_country(
    name: str,
    x_api_key: str = Header(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if x_api_key != current_user.api_key:
        raise HTTPException(status_code=403, detail="Invalid API Key")

    db_user = db.query(User).filter(User.id == current_user.id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.api_key_usage_count += 1
    db_user.api_key_last_used = datetime.utcnow()
    db.commit()

    restCountriesApi = settings.rest_countries_api

    if not restCountriesApi:
        raise HTTPException(status_code=500, detail="REST_COUNTRIES_API environment variable not set")

    response = requests.get(f"{restCountriesApi}/name/{name}", timeout=5) # type: ignore

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Country not found")

    try:
        data = response.json()[0]
        return {
            "country_name": data.get("name", {}).get("common"),
            "capital": data.get("capital", [None])[0],
            "currencies": list(data.get("currencies", {}).keys()),
            "languages": list(data.get("languages", {}).values()),
            "flag": data.get("flags", {}).get("png")
        }
    except Exception:
        raise HTTPException(status_code=500, detail="Error processing country data")
