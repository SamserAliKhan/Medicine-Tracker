#  Medicine Tracker

A secure, user-friendly **full-stack web application** for tracking home medicines, managing inventory, and receiving timely refill reminders.  
Built with **Spring Boot**, **PostgreSQL**, and **React**, the system ensures that each user’s data is stored securely with **JWT-based authentication**.

---

##  Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
<!-- - [Screenshots](#screenshots) -->
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Future Enhancements](#future-enhancements)
<!-- - [License](#license) -->

---

##  Features
- **User Authentication**
  - Sign up, login, and logout securely with JWT tokens.
  - Passwords stored securely with hashing.
- **Medicine Management**
  - Add, view, edit, and delete medicines linked to the logged-in user.
  - Track expiry dates, quantity, and dosage instructions.
- **Refill Reminders**
  - Notifications for low stock and upcoming expiry.
- **Responsive UI**
  - Optimized for desktop, tablet, and mobile views.
- **Protected Routes**
  - User-specific dashboards with access control.
- **Validation & Error Handling**
  - Backend validations for fields like name, date, and quantity.
  - Centralized exception handling with `@ControllerAdvice`.

---

##  Tech Stack

**Frontend:**
- React (with Hooks & Context API)
- Axios for API requests
- Tailwind CSS for styling

**Backend:**
- Java Spring Boot
- Spring Security with JWT Authentication
- PostgreSQL as the database
- JPA/Hibernate for ORM
- Lombok for boilerplate reduction

**Other:**
- Maven for build management
- CORS configuration for frontend-backend integration
- Deployed on [specify deployment platform if applicable]

---

## Architecture


---

##  Installation

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/SamserAliKhan/Medicine-Tracker.git
   cd Medicine-Tracker
2. **Install Backed**
   ```bash
   cd server/medtracker
   mvn clean install
  - Configure application.properties with your PostgreSQL credentials.  
  - Run Backend:
    ```bash
    mvn spring-boot:run
3. **Setup Frontend**
   ```bash
    cd client
    npm install
    npm start
  ---

## Usage
- Sign up or log in to access your dashboard.  
- Add new medicines with details like name, quantity, expiry date, and dosage.  
- View medicines in the dashboard table.  
- Edit or delete entries as required.  
- Receive low stock and expiry reminders.  

  ---

<!-- ## Screenshots

  --- -->

## API Endpoints

  ### **Authentication**
| Method | Endpoint           | Description                | Auth Required |
|--------|-------------------|----------------------------|---------------|
| POST   | `/api/auth/signup` | Register a new user        | ❌            |
| POST   | `/api/auth/login`  | Login user                 | ❌            |
| GET    | `/api/auth/me`     | Get current user info      | ✅ JWT Token  |

---

### **Medicines**
| Method | Endpoint                  | Description                             | Auth Required |
|--------|---------------------------|-----------------------------------------|---------------|
| GET    | `/api/medicines`           | Get all medicines for the logged-in user| ✅ JWT Token  |
| POST   | `/api/medicines`           | Add a new medicine                      | ✅ JWT Token  |
| PUT    | `/api/medicines/{id}`      | Update an existing medicine             | ✅ JWT Token  |
| DELETE | `/api/medicines/{id}`      | Delete a medicine                       | ✅ JWT Token  |

> **Note:**  
> - All authenticated routes require the JWT token to be sent in the `Authorization` header as:  
>   ```
>   Authorization: Bearer <your_token_here>
>   ```
> - Replace `{id}` with the medicine's unique ID in the URL.

  ---

## Security
- JWT authentication ensures that only authorized users can access their medicines.
- Passwords are stored in a hashed form (BCrypt).
- CORS configured to allow only trusted origins.
- Validation prevents malformed or malicious data.

  ---

## Future Enhancements
- Push notifications for reminders.
- Role-based access (e.g., family members, caregivers).
- Cloud storage integration for prescription images.
- Multi-language support.
- PWA (Progressive Web App) support for offline usage.

  ---

<!-- ## License -->

