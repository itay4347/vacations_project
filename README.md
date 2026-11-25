# Vacations Project ✈️

A full-stack vacation booking and tracking web app. Users browse vacations, filter them and follow the ones they like. Admins manage the vacation catalog and see analytics on how popular each destination is.

Built with **React + TypeScript** on the frontend and **Node.js + Express + TypeScript** on the backend, with a **MySQL** database.

<!-- Add a screenshot or GIF here: ![App screenshot](docs/screenshot.png) -->

---

## Features

### For users
- **Sign up and log in** with JWT-based authentication. Passwords are hashed with bcrypt.
- **Browse vacations** as cards showing destination, dates, price and image, with pagination (10 per page).
- **Follow / unfollow** vacations with a like button.
- **Filter vacations** by:
  - Vacations that haven't started yet
  - Currently active vacations
  - Vacations I follow
  - Filters can be combined (for example, "active + followed").

### For admins
- **Role-based access control.** Admin-only routes are protected on the server by middleware.
- **Add, edit and delete vacations**, including image upload.
- **Followers chart:** a bar chart of followers per destination (Chart.js).
- **CSV export** of follower counts per destination.

### General
- Client-side form validation (React Hook Form + Yup) and server-side validation (Joi).
- Centralized error handling and logging (Winston).
- Global state management with Redux Toolkit.

---

## Tech Stack

| Layer      | Technologies |
|------------|--------------|
| Frontend   | React 18, TypeScript, Redux Toolkit, React Router v6, React Hook Form, Yup, Axios, Chart.js, SCSS Modules |
| Backend    | Node.js, Express, TypeScript, JWT, bcrypt, Joi, express-fileupload, Winston, json2csv |
| Database   | MySQL |

---

## Architecture

The backend uses a layered structure:

```
backend/src
├── 1-assets/        # Uploaded vacation images
├── 2-utils/         # DAL (MySQL connection pool), JWT, bcrypt, logger
├── 3-middleware/    # Auth verification, admin check, error handling
├── 4-models/        # Domain models with Joi validation
├── 5-logic/         # Business logic & SQL queries
├── 6-controllers/   # Express routers (REST endpoints)
└── app.ts           # Server entry point
```

```
frontend/src
├── components/      # UI components (Auth, Vacations, Admin, Chart, shared components)
├── auth/            # Auth Redux slice
├── store/           # Redux store
├── fetch/           # API service layer
├── axios/           # Configured Axios instance
└── models/          # TypeScript models
```

---

## API Overview

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST   | `/api/auth/register` | Public | Register a new user |
| POST   | `/api/auth/login` | Public | Log in, returns a JWT |
| GET    | `/api/vacations` | Logged in | Get all vacations |
| GET    | `/api/vacations/active` | Logged in | Get currently active vacations |
| GET    | `/api/vacations/start` | Logged in | Get vacations that haven't started |
| POST   | `/api/vacations` | Admin | Add a vacation (with image) |
| PUT    | `/api/vacations/:id` | Admin | Update a vacation |
| DELETE | `/api/vacations/:id` | Admin | Delete a vacation |
| GET    | `/api/vacations/images/:imageName` | Public | Get a vacation image |
| POST   | `/api/followers` | Logged in | Follow a vacation |
| DELETE | `/api/followers/:userId/vacations/:vacationId` | Logged in | Unfollow a vacation |
| GET    | `/api/followers/vacations/:userId` | Logged in | Vacations followed by a user |
| GET    | `/api/followersCount` | Logged in | Follower count per vacation |
| GET    | `/api/followers/csv` | Admin | Export follower counts as CSV |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL 8

### 1. Database
Import the database schema and sample data:
```bash
mysql -u <user> -p < database/vacations_project_database.sql
```

### 2. Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=3001
DB_HOST=localhost
DB_USER=<your_mysql_user>
DB_PASSWORD=<your_mysql_password>
DB_DATABASE=vacations_project
SECRET_KEY=<any_random_secret>
```
Run the server:
```bash
npm start
```
The API runs on `http://localhost:3001/api`.

### 3. Frontend
```bash
cd frontend
npm install
npm start
```
The app opens at `http://localhost:3000`.

### Admin access
New users register with the `User` role. To get admin access, change a user's role in the database:
```sql
UPDATE users SET role = 'Admin' WHERE email = '<your_email>';
```
