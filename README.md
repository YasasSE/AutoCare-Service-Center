# AutoCare-Service-Center Vehicle Service Booking System

A full-stack web application for managing vehicle service bookings.\
The project is designed as a learning-focused implementation of a modern
backend API with a React frontend.

## Overview

The Vehicle Service Booking System allows users to view available
vehicle services and create bookings, while administrators can manage
services and bookings through a secured backend API.

This project demonstrates clean separation between frontend and backend,
RESTful API design, authentication, and database integration.

## Features

-   User authentication with JWT
-   Admin account initialization through database seeding
-   View available vehicle services
-   Create and manage service bookings
-   RESTful API built with Express
-   MongoDB data persistence using Mongoose
-   Modular and reusable frontend UI components

## Tech Stack

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JSON Web Tokens (JWT)
-   Nodemon

### Frontend

-   React
-   Tailwind CSS
-   Component-based UI architecture

## Project Structure

    vehicle-service-booking/
    ├── backend/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── server.js
    │   ├── seed.js
    │   └── package.json
    └── frontend/
        ├── src/
        ├── index.html
        └── package.json

## Backend Setup

### 1. Navigate to backend directory

    cd backend

### 2. Install dependencies

    npm install

### 3. Configure environment variables

Create a `.env` file in the `backend` directory:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    NODE_ENV=development
    PORT=5000

### 4. Seed the database

    npm run seed

This will create: - Default admin user - Sample vehicle services

### 5. Start the development server

    npm run dev

Backend server runs at:

    http://localhost:5000

## Default Admin Credentials

    Username: admin
    Password: admin123

## API Endpoints (Sample)

    POST /api/auth/login
    GET  /api/services
    POST /api/bookings
    GET  /api/bookings

Some endpoints require authentication using a Bearer token.

## Frontend Setup

Navigate to the frontend directory and install dependencies:

    cd frontend
    npm install
    npm start

Frontend runs separately and communicates with the backend API.

## Development Notes

-   The frontend contains a reusable UI component library; not all
    components are currently used.
-   The project is structured for clarity and future extension.
-   Error handling and validation are kept simple for learning purposes.

## Project Status

This project is under active development and primarily intended for
educational use.
