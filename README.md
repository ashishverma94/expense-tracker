# EXPENSE TRACKER APP

React (Vite + TS + Tailwind + MUI) frontend with an Express + MongoDB backend.

## Setup

### Backend

create .env file in backend roote folder 
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=fdklfdjkfhwqifuesahfdjsalfoiwfdahldjsfhao
JWT_EXPIRES_IN=7d
NODE_ENV=development
```
Then run these commands

```bash
cd backend
npm install
npm run dev                 # starts on :5000
```

### Frontend

create .env file in backend roote folder 
```
VITE_BACKEND_URL=http://localhost:5000/api
```
Then run these commands
```bash
cd frontend
npm install
npm run dev                 # starts on :5173 
```

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/dashboard` | ✅ Bearer | Protected dashboard data |
| GET | `/api/health` | ❌ | Health check |

### Register Request Body
```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }
```

### Login Request Body
```json
{ "email": "jane@example.com", "password": "secret123" }
```

### Auth Response (both endpoints)
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "Jane Doe", "email": "jane@example.com" }
}
```

---

## Routes (Frontend)

| Path | Protection | Component |
|------|-----------|-----------|
| `/auth` | Public | `AuthPage` (Login + Signup tabs) |
| `/dashboard` | Protected | `DashboardPage` |

Unauthenticated access to `/dashboard` redirects to `/auth`.  
Authenticated access to `/auth` redirects to `/dashboard`.

---
