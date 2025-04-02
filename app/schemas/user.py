from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    username: constr(min_length=3, max_length=20)
    email: EmailStr
    password: constr(min_length=6)

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    api_key: str

    class Config:
        orm_mode = True
