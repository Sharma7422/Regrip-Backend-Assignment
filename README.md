# Task Management System - Backend

A robust backend for a Task Management System built with Node.js, Express, and MySQL. Features secure OTP-based authentication, JWT tokens, task CRUD operations, activity logging, and rate limiting.

---

## Getting Started

### 1. Clone Repository

git clone https://github.com/Sharma7422/Regrip-Backend-Assignment
cd regrip-assignment

### 2. Install Dependencies

npm install

### 3. Create Database

Connect to MySQL:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE regrip_task;
EXIT;
```

### 4. Create .env File

Copy `.env.example` and create `.env`:

```bash
cp .env.example .env
```

Then update with your credentials:

```env
# Server
PORT=5000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=regrip_task

# JWT
JWT_SECRET=your_jwt_secret_key

# Email (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

**Note**: For Gmail, use [App Passwords]

### 5. Run Server Locally

```bash
npm start
```

Server runs on: `https://regrip-backend-assignment-sv16.onrender.com`

Swagger Docs: `https://regrip-backend-assignment-sv16.onrender.com/api-docs`

---

## Environment Variables (.env.example)

```env
# Server Configuration
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=regrip_task

# JWT Configuration
JWT_SECRET=your_secret_key

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

---

## Hosted Backend

- **API URL**: `https://regrip-backend-assignment-sv16.onrender.com/api`
- **Swagger Docs**: `https://regrip-backend-assignment-sv16.onrender.com/api-docs`

## Quick Links

GitHub Repo :- `https://github.com/yourusername/regrip-assignment`
Live API :- `https://regrip-backend-assignment-sv16.onrender.com`
API Docs :- `https://regrip-backend-assignment-sv16.onrender.com/api-docs`

## API Documentation

### Interactive Swagger UI

Visit: `https://regrip-backend-assignment-sv16.onrender.com/api-docs`

### Authentication Endpoints

#### Send OTP

```
POST /api/auth/send-otp
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Verify OTP

```
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}

Response:
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Task Endpoints (Protected)

All task endpoints require `Authorization: Bearer <token>` header.

#### Create Task

```
POST /api/tasks/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish authentication setup",
  "status": "pending"
}
```

#### Get All Tasks

```
GET /api/tasks/list
Authorization: Bearer <token>
```

#### Update Task

```
PUT /api/tasks/update/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

#### Delete Task

```
DELETE /api/tasks/delete/1
Authorization: Bearer <token>
```

---

## Features

- **OTP-based Authentication**: Secure email verification with 5-minute OTP expiry
- **JWT Tokens**: 15-minute access tokens for secure API access
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Activity Logging**: Audit trail for all user actions
- **Rate Limiting**: Protection against abuse on OTP, login, and general API endpoints
- **Authorization**: Users can only access their own data
- **Global Error Handling**: Centralized error management
- **Swagger Documentation**: Interactive API documentation at `/api-docs`

## Prerequisites

- Node.js v18+ installed
- MySQL Server running
- Git installed
- Email account (Gmail recommended) with App Password

## Project Structure

```
src/
├── app.js                    # Express app setup
├── config/
│   ├── db.js               # Database connection
│   └── swagger.js          # Swagger configuration
├── controllers/
│   ├── auth.controller.js  # Authentication logic
│   └── task.controller.js  # Task CRUD operations
├── middleware/
│   ├── auth.middleware.js  # JWT verification
│   ├── errorHandler.js     # Global error handling
│   └── rateLimiter.js      # Rate limiting
├── models/
│   ├── user.model.js       # User schema
│   ├── activity.model.js   # Activity log schema
│   ├── task.model.js       # Task schema
│   └── index.js            # Model exports & sync
├── routes/
│   ├── auth.routes.js      # Auth endpoints
│   └── task.routes.js      # Task endpoints
└── utils/
    ├── generateOtp.js      # OTP generator
    ├── sendEmail.js        # Email sender
    ├── logActivity.js      # Activity logger
    └── asyncHandler.js     # Async error wrapper
```

---

## Deployment

### Deploy to Render

1. **Push code to GitHub**

```bash
git push origin main
```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repo
   - Set environment variables (.env)
   - Deploy

3. **Environment Variables on Render**

```
PORT=5000
DB_HOST=mysql.server.com
DB_USER=remote_user
DB_PASS=remote_password
DB_NAME=regrip_task
JWT_SECRET=production_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=app_password
```

4. **Test Hosted API**

```bash
curl https://regrip-backend-assignment-sv16.onrender.com
```

---

## Assumptions

1. Users are identified only by email (no username)
2. One active OTP per user at a time
3. Tasks belong exclusively to users
4. Activity logging is asynchronous (doesn't block operations)
5. Rate limiting uses in-memory store (single server deployment)
