# NanoURL 🔗

A full-stack URL shortening application built using **React**, **Spring Boot**, and **PostgreSQL**.
NanoURL allows users to generate compact shortened URLs and redirect users seamlessly to original links.

---

# 🚀 Features

* Shorten long URLs into compact links
* Redirect shortened URLs to original destinations
* RESTful API architecture
* Persistent storage using PostgreSQL
* Responsive frontend built with React
* Dockerized setup for easy deployment
* API testing with Postman

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Axios
* Tailwind CSS

## Backend

* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security

## Database

* PostgreSQL

## Dev Tools

* Docker
* Postman
* Maven

---

# 🏗️ System Architecture

Frontend (React) communicates with backend REST APIs built in Spring Boot.

The backend:

1. Accepts long URLs
2. Generates unique short codes
3. Stores mappings in PostgreSQL
4. Redirects users using stored mappings

---

# 📂 Project Structure

```bash
NanoURL/
│
├── NanoUrl-frontend/        # React frontend
├── NanoURL/                 # Spring Boot backend
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/NanoURL.git
cd NanoURL
```

---

# 🔧 Backend Setup

```bash
cd NanoURL
mvn clean install
mvn spring-boot:run
```

---

# 💻 Frontend Setup

```bash
cd NanoUrl-frontend
npm install
npm run dev
```

---

# 🐳 Docker Setup

Run the entire application using Docker:

```bash
docker build -t .
```

---

# 🗄️ Database Configuration

create `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/nanourl
spring.datasource.username=postgres
spring.datasource.password=yourpassword
```

---
# Screenshots

<img width="1898" height="938" alt="Screenshot 2026-05-28 210432" src="https://github.com/user-attachments/assets/35a8ecac-1931-49a9-9089-c1c827f94219" />

<img width="1600" height="935" alt="image" src="https://github.com/user-attachments/assets/3626c109-e427-45f7-b9b8-1f6bf95cfdae" />

<img width="1598" height="643" alt="image" src="https://github.com/user-attachments/assets/8fec6378-95af-407b-aba6-dc034531c83a" />

<img width="1486" height="923" alt="image" src="https://github.com/user-attachments/assets/dbc31864-5152-4dfd-a449-99f4ba8e1910" />





---

# 🔌 API Endpoints

## Create Short URL

```http
POST /api/url/shorten
```

### Request Body

```json
{
  "originalUrl": "https://example.com"
}
```

### Response

```json
{
    "clickCount": 0,
    "dateTime": "2026-05-19T21:29:28.5594516",
    "id": 2,
    "originalurl": "https://Google.com",
    "shorturl": "ElEULFH",
    "username": "Pratik"
}
```

---

# 🔄 Redirect Endpoint

```http
GET /{shortCode}
```

Redirects user to original URL.

---

# 🧪 API Testing

API endpoints were tested using Postman.

Example test cases:

* Valid URL shortening
* Invalid URL handling
* Redirection validation
* Duplicate URL checks

---

---

# 🌟 Future Improvements

* Redis caching
* Rate limiting
* QR code generation

---

# 👨‍💻 Author

Pratik Senapati

GitHub: https://github.com/PratikC54
