from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.core.security import get_current_user
from app.database.models import User
from app.database.db import get_db  # You might need to import this
import requests

router = APIRouter(prefix="/countries", tags=["Countries"])

@router.get("/{name}")
def get_country(
    name: str,
    x_api_key: str = Header(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)  # NEW
):
    #  Step 1: Validate API Key
    if x_api_key != current_user.api_key:
        raise HTTPException(status_code=403, detail="Invalid API Key")

    #  Step 2: Update usage tracking
    current_user.api_key_usage_count += 1
    current_user.api_key_last_used = datetime.utcnow()
    db.commit()

    #  Step 3: Fetch from RestCountries API
    # response = requests.get(f"https://restcountries.com/v3.1/name/{name}")
    response = requests.get(f"https://restcountries.com/v3.1/name/{name}", timeout=5)

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
