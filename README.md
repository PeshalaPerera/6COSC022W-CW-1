# 🌐 SecureAPI – Secure Country Middleware

> A secure API middleware that bridges users with [RestCountries.com](https://restcountries.com). Built with **FastAPI**, **SQLite**, and **React**.

---

## 📦 Installation & Setup

Follow these steps to get the project running locally:

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/PeshalaPerera/6COSC022W-CW-1.git
cd secureapi
```

### 🔁 2. Setup Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 🔁 3. Setup Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

### 🐳 Optional: Run with Docker

```bash
cd backend
docker build -t secureapi-backend .
docker run -d -p 8000:8000 secureapi-backend
```

## 🚀 Project Overview

**SecureAPI** is a full-stack middleware application that:
- Interfaces with RestCountries.com
- Implements secure user registration and login
- Supports API key generation and tracking
- Provides admin functionality
- Is fully documented using Swagger (OpenAPI)

---

## 🛠 Tech Stack

- **Backend**: FastAPI, SQLAlchemy, SQLite, JWT, Docker
- **Frontend**: React + TypeScript
- **Database**: SQLite (normalized to 3NF)
- **Security**: JWT tokens, password hashing, API key headers
- **Docs**: Swagger/OpenAPI (`/docs`)

---

## 🔐 Key Features

- ✅ User registration & secure login (JWT)
- ✅ API key generation & authentication
- ✅ Country data middleware from RestCountries API
- ✅ API key usage tracking (count & timestamp)
- ✅ Admin panel to view all users
- ✅ Docker support
- ✅ Swagger API documentation

---

## 🌍 Country API Output

When a country is searched, the middleware returns:

- Country name  
- Capital  
- Currency codes  
- Languages  
- National flag (image URL)

---

## 🔧 API Endpoints (via Swagger)

**Visit:** [`http://localhost:8000/docs`](http://localhost:8000/docs)

### ⚙️ Auth
| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| `POST` | `/auth/register` | Register a new user     |
| `POST` | `/auth/login`    | Login and get JWT       |
| `GET`  | `/auth/me`       | Get logged-in user info |
| `GET`  | `/auth/usage`    | View API key usage stats|

### 🌐 Country Search
| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| `GET`  | `/countries/{name}`    | Get filtered country info |

### 🛠 Admin Tools
| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| `GET`  | `/admin/users`   | View all user data  |

---

## 🛡 Security

- **JWT-based login/session**
- **API key header protection**
- **Hashed passwords using Bcrypt**
- **Admin-only routes**
- **Secure SQLite schema**

---

## 💽 Database Highlights

- Normalized to 3NF
- Tracks:
  - `api_key_usage_count`
  - `api_key_last_used`
- API key is unique and securely generated per user

---

## 🖼 Sample UI Screens

### ✅ Register
<img width="1456" alt="image" src="https://github.com/user-attachments/assets/83836981-19ef-4c86-b14f-21e45ca68412" />

### ✅ Login
<img width="1455" alt="image" src="https://github.com/user-attachments/assets/90a06030-2227-4dff-9131-1142475473d1" />

### ✅ Dashboard + Search
<img width="1456" alt="image" src="https://github.com/user-attachments/assets/5892e475-a901-405c-9553-dbbd35d8976c" />

<img width="1456" alt="image" src="https://github.com/user-attachments/assets/a405726f-5717-41e9-b908-ddb2421c5b07" />

### ✅ Admin Panel
<img width="1455" alt="image" src="https://github.com/user-attachments/assets/8a86d966-4127-4a99-924a-70875d237cd7" />

---

## ✅ **Coursework Alignment**

### 🔹 **Core Features**
- ✔️ **REST API integration** (*RestCountries*)
- ✔️ **Secure endpoints** with **JSON responses**
- ✔️ **Frontend**: **Register**, **Login**, **Search UI**

### 🔹 **Security**
- ✔️ **JWT tokens**
- ✔️ **API key validation**
- ✔️ **Password hashing**
- ✔️ **Protected routes**

### 🔹 **Data & Admin**
- ✔️ **3NF-compliant SQLite DB**
- ✔️ **Tracks usage** and **last-used timestamps**
- ✔️ **Admin can list all users**

### 🔹 **Technical**
- ✔️ **Swagger documentation**
- ✔️ **Fully Dockerized backend**
<img width="1034" alt="image" src="https://github.com/user-attachments/assets/aebf3b05-466c-40a6-84ce-f397e6be3514" />

---

## 🧑‍🎓 **Author**
**Name:** [Peshala Perera]  
**Course:** 6COSC022W – **Trends in Computer Science** *(University of Westminster)*

---

## 💬 **Final Note**
This project demonstrates **end-to-end secure middleware integration**, featuring:

- 🔐 **Security best practices**
- 🧱 **Clean RESTful architecture**
- 🚀 **Production-ready deployment options**

> For any questions or deployment support, please reach out via **GitHub Issues**.
