
# Hospital Management System API

A backend application for managing hospital patients, doctors, and doctor assignments.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt for password hashing

## Features

- User registration and login
- JWT-based authentication
- Create, view, update, and delete patient records
- Create, view, update, and delete doctor records
- Assign doctors to patients
- View and remove doctor assignments
- Patient ownership checks

## Installation

1. Clone this repository.
2. Install dependencies:

   npm install

3. Create a PostgreSQL database named `hospital_db`.
4. Create a `.env` file in the project root:

   PORT=5000
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hospital_db"
   JWT_SECRET="your_long_random_secret"

5. Apply database migrations:

   npx prisma migrate deploy

6. Start the development server:

   npm run dev

The API runs at http://localhost:5000.

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Patients
- POST /api/patients
- GET /api/patients
- GET /api/patients/:id
- PUT /api/patients/:id
- DELETE /api/patients/:id

### Doctors
- POST /api/doctors
- GET /api/doctors
- GET /api/doctors/:id
- PUT /api/doctors/:id
- DELETE /api/doctors/:id

### Patient-Doctor Mappings
- POST /api/mappings
- GET /api/mappings
- GET /api/mappings/:patient_id
- DELETE /api/mappings/:id

Protected endpoints require a valid JWT Bearer token.

## Testing

Use Postman to test the API endpoints.

## Environment Variables

Never commit your actual `.env` file or database credentials.
