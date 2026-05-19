# NanoURL

A fast and minimal URL shortener application built with a modern full-stack architecture using React for the frontend and Spring Boot for the backend.

---

## Features

- Shorten long URLs instantly
- Redirect short URLs to original links
- REST API support
- Frontend + Backend separation
- Clean and scalable architecture
- API testing with Postman
- Version control with Git

---

## Tech Stack

### Frontend
- React

### Backend
- Java
- Spring Boot

### Tools
- Postman
- Git

---
# Backend Setup (Spring Boot)
## Prerequisites
- Java 17+ (or your version)
- Maven
- Run Backend
- cd backend
- mvn spring-boot:run
  
---  
# Frontend Setup (React)
## Prerequisites
- Node.js
- npm
- Run Frontend
- cd frontend
- npm install
- npm start

---
# API Endpoints
## Create Short URL
```
POST /api/urls/shorten
 Request Body
{
  "originalUrl": "https://example.com"
}
 Response
{
    "clickCount": 0,
    "dateTime": "2026-05-19T21:29:28.5594516",
    "id": 2,
    "originalurl": "https://Google.com",
    "shorturl": "ElEULFH",
    "username": "Pratik"
}
```
# Testing with Postman
Use Postman to test API endpoints.
Example:

- POST request for creating and validating user
- POST request for shortening URLs
- GET request for redirection testing

# Clone Repository
- git clone https://github.com/your-username/NanoURL.git
