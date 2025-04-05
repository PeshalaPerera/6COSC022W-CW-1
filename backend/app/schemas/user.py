from pydantic import BaseModel, EmailStr, constr # type: ignore

class UserCreate(BaseModel):
    username: constr(min_length=3, max_length=20) # type: ignore
    email: EmailStr
    password: constr(min_length=6) # type: ignore

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    api_key: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
