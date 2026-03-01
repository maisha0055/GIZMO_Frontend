<div align="center">

<img src="./client/src/assets/logo.png" alt="GIZMO Logo" width="120" />

# GIZMO
### An Integrated Career Networking & Employment Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Frontend-brightgreen?style=for-the-badge&logo=vercel)](https://gizmo-frontend.vercel.app)
[![Backend API](https://img.shields.io/badge/API-Backend-blue?style=for-the-badge&logo=vercel)](https://gizmo-alpha.vercel.app)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)

</div>

---

## 📌 Overview

**GIZMO** is a full-stack career networking and employment platform built with the **MERN stack**. It bridges the gap between job seekers and recruiters by providing a seamless, feature-rich environment for job discovery, application tracking, and hiring management — all in one place.

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| 🌐 Frontend | [gizmo-frontend.vercel.app](https://gizmo-frontend.vercel.app) |
| ⚙️ Backend API | [gizmo-alpha.vercel.app](https://gizmo-alpha.vercel.app) |

---

## ✨ Features

### 👔 For Recruiters (Admin)
| Feature | Status |
|---|---|
| Job Posting Management — create, post, and manage job openings | ✅ |
| Applicant Screening & Decision — accept or reject candidates via dashboard | ✅ |
| Manage Job Visibility — toggle job listings on/off | ✅ |
| View Applications per Job | ✅ |
| Integrated Online Interviews — real-time viva/interview sessions | 🔄 In Progress |
| Multi-Company Messaging & Chat — secure real-time communication | 🔄 In Progress |

### 🛡️ For System Admin
| Feature | Status |
|---|---|
| User & Company Management — ban/unban fraudulent accounts | ✅ |
| Content Management — publish and manage News & Industry Journals | ✅ |
| Report Resolution — review and act on user/company reports | ✅ |
| Secure Admin Dashboard — protected by dedicated credentials | ✅ |

### 🎯 For Job Seekers
| Feature | Status |
|---|---|
| Advanced Job Search by Category & Location | ✅ |
| Detailed Job Profiles — full requirements and responsibilities | ✅ |
| Smart Resume Upload & Parsing — auto-extract skills and experience | ✅ |
| Comprehensive Application History — track applied jobs and outcomes | ✅ |
| Emergency Contact Management — store emergency contacts securely | ✅ |
| Latest Job News & Industry Journals — stay updated with the job market | ✅ |
| Reporting System — report suspicious companies/applicants | ✅ |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — UI library
- **Vite** — build tool
- **Tailwind CSS** — utility-first styling
- **Clerk** — authentication & user management
- **Axios** — HTTP client

### Backend
- **Node.js** — runtime
- **Express.js** — web framework
- **MongoDB + Mongoose** — database & ODM
- **Cloudinary** — image & file storage
- **Clerk (Express SDK)** — server-side auth middleware
- **Bcrypt** — password hashing
- **JWT** — token-based auth for company accounts
- **Sentry** — error monitoring
- **Multer** — file uploads
- **Svix** — webhook verification

### Deployment
- **Vercel** — both frontend and backend hosted on Vercel

---

## 🏗️ Project Structure

```
GIZMO/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── assets/         # Images, icons, static files
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── JobListing.jsx
│   │   │   ├── JobCart.jsx
│   │   │   ├── RecruiterLogin.jsx
│   │   │   ├── Portal.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/          # Application pages
│   │   │   ├── Home.jsx
│   │   │   ├── ApplyJob.jsx
│   │   │   ├── Applications.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddJob.jsx
│   │   │   ├── ManageJobs.jsx
│   │   │   ├── ViewApplications.jsx
│   │   │   ├── Interview.jsx
│   │   │   ├── EmergencyContact.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── NewsPage.jsx
│   │   └── context/        # React context for global state
│   └── package.json
│
└── server/                 # Node.js + Express backend
    ├── config/             # DB, Cloudinary, Sentry config
    ├── controllers/        # Route logic handlers
    ├── middleware/         # Auth middleware
    ├── models/             # Mongoose schemas
    ├── routes/             # API route definitions
    ├── utils/              # Helper utilities
    ├── server.js           # Entry point
    └── vercel.json         # Vercel serverless config
```

---

## ⚙️ Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Clerk account

### 1. Clone the Repository

```bash
git clone https://github.com/maisha0055/GIZMO.git
cd GIZMO
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@gizmo.com
ADMIN_PASSWORD=your_admin_password
ADMIN_JWT_SECRET=your_admin_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run server
```

### 3. Setup the Frontend 

```bash
cd ../client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔑 User Roles

### Job Seeker
- Sign up / log in via **Clerk** (Google or email)
- Browse and apply to jobs
- Upload resume, track application history
- Manage emergency contacts

### Recruiter (Company Admin)
- Register your company with name, email, password, and logo
- Log in via the **Recruiter Login** portal on the homepage
- Post and manage jobs, review and decide on applicants
- Report suspicious applicants

### System Admin
- Access via `/admin/login`
- Manage all users and companies (Ban/Unban)
- Publish/Delete News and Journals
- Resolve reports submitted by users/companies

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `POST` | `/webhooks` | Clerk webhook handler |
| `POST` | `/api/company/register` | Register a company |
| `POST` | `/api/company/login` | Company login |
| `GET` | `/api/company/company` | Get company data |
| `POST` | `/api/company/post-job` | Post a new job |
| `GET` | `/api/company/applicants` | Get job applicants |
| `GET` | `/api/company/list-jobs` | Get company's posted jobs |
| `POST` | `/api/company/change-status` | Update applicant status |
| `POST` | `/api/company/change-visibility` | Toggle job visibility |
| `GET` | `/api/jobs` | Get all job listings |
| `GET` | `/api/jobs/:id` | Get single job details |
| `GET` | `/api/users/user` | Get user profile |
| `POST` | `/api/users/apply` | Apply for a job |
| `GET` | `/api/users/applications` | Get user's application history |
| `POST` | `/api/users/update-resume` | Upload/update resume |
| `POST` | `/api/reports` | Submit a report (User or Company) |

### 🛡️ Admin Endpoints (Protected)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/login` | Admin authentication |
| `GET` | `/api/admin/users` | List all users |
| `PUT` | `/api/admin/ban-user/:id` | Ban a user |
| `GET` | `/api/admin/companies` | List all companies |
| `PUT` | `/api/admin/ban-company/:id` | Ban a company |
| `POST` | `/api/admin/news` | Publish news/journal |
| `GET` | `/api/admin/news` | Get all news (Public) |
| `DELETE` | `/api/admin/news/:id` | Delete news |
| `GET` | `/api/admin/reports` | View all reports |
| `PUT` | `/api/admin/resolve-report/:id` | Mark report as resolved |

---

## 🖼️ Screenshots

> *Coming soon — UI screenshots and demo GIFs*

---


---

## 👩‍💻 Author

**Maisha Ahmed**
- GitHub: [@maisha0055](https://github.com/maisha0055)

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  Made with ❤️ using the MERN Stack
</div>
