# Hospital Management System API

A REST API for managing patients, doctors, and patient-doctor assignments.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt

## Features

- User registration and login
- JWT-based authentication
- Patient CRUD operations with user-specific access control
- Doctor CRUD operations
- Assign doctors to patients
- View patient-doctor assignments
- Remove doctor assignments
- Input validation and error handling

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shashwat-pandey21/hospital-management-system.git
cd hospital-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hospital_db"
JWT_SECRET="your_secure_secret"
```

Replace `YOUR_PASSWORD` with your PostgreSQL password and configure a secure JWT secret.

### 4. Create the database

Create a PostgreSQL database named `hospital_db`.

### 5. Apply database migrations

```bash
npx prisma migrate deploy
```

### 6. Start the server

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

## API Endpoints

### Authentication

| Method | Endpoint |
|---|---|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

### Patients

| Method | Endpoint |
|---|---|
| POST | `/api/patients` |
| GET | `/api/patients` |
| GET | `/api/patients/:id` |
| PUT | `/api/patients/:id` |
| DELETE | `/api/patients/:id` |

### Doctors

| Method | Endpoint |
|---|---|
| POST | `/api/doctors` |
| GET | `/api/doctors` |
| GET | `/api/doctors/:id` |
| PUT | `/api/doctors/:id` |
| DELETE | `/api/doctors/:id` |

### Patient-Doctor Assignments

| Method | Endpoint |
|---|---|
| POST | `/api/mappings` |
| GET | `/api/mappings` |
| GET | `/api/mappings/:patient_id` |
| DELETE | `/api/mappings/:id` |

## Authentication

Protected endpoints require a JWT access token in the request header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Register or log in to obtain a token.

## Testing

API endpoints can be tested using Postman.

## Security

Keep database credentials and JWT secrets in `.env`. Never commit `.env` or other sensitive credentials to version control.
