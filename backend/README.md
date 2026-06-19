# CollabSphere 👨‍💻🔥

A full-stack networking platform (builder network for developers) built with the MERN stack that allows developers to connect, collaborate, and grow together.

🚀 Features

🔐 Authentication & Authorization – JWT-based secure login and signup.

👤 Profile Management – Create, update, and manage user profiles.

🤝 Connection Requests – Send, accept, or reject connection requests.

🛡️ Security First – Password hashing, JWT auth, CORS handling.

📦 RESTful APIs – Clean, modular backend architecture.

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS, DaisyUI

Backend: Node.js, Express.js

Database: MongoDB (NoSQL)

Authentication: JWT (JSON Web Tokens), bcrypt.js

📂 Project Structure
CollabSphere/
├── backend/          # Express backend application
│   ├── src/
│   │   ├── config/      # DB config
│   │   ├── middlewares/ # Auth middlewares
│   │   ├── models/      # Mongoose models (User, ConnectionRequest)
│   │   ├── routes/      # Express routes (auth, user, requests, profile)
│   │   ├── utils/       # Validators
│   │   └── app.js       # Express app setup
└── frontend/         # React frontend application

⚡ Setup & Installation

Install dependencies:
- Backend:
  ```bash
  cd backend
  npm install
  ```
- Frontend:
  ```bash
  cd frontend
  npm install
  ```

Add environment variables (`backend/.env`):
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/collapsphere
JWT_SECRET=your-secret-key
```

Run the app:
- Backend:
  ```bash
  cd backend
  npm run dev
  ```
- Frontend:
  ```bash
  cd frontend
  npm run dev
  ```

🎯 Uniqueness
Unlike typical social apps, CollabSphere is focused on developers, enabling tech-specific networking and collaboration.
