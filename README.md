# Fetch Dog Adoption - React Vite TypeScript App

## 🚀 Project Overview

This project is a **React Vite TypeScript** application for a **Dog Adoption Portal**. It allows users to:

- **Authenticate** using name & email (session-based via HttpOnly cookies)
- **Search for dogs** based on breeds, age, and location
- **Fetch dog details** and display dog cards
- **Match with a dog** for adoption
- **Search locations** by ZIP codes, city, or state
- **Manage session & route protection** using authentication

## 🛠️ Technologies Used

- **React** (with Vite & TypeScript)
- **React Hook Form** (form handling)
- **Zod** (form validation)
- **Axios** (API requests)
- **React Router** (navigation & route protection)
- **Tailwind CSS** (UI styling)

---

## ⚡ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/----
cd fetch-dog-adoption
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Create `.env` File**

```sh
touch .env
```

Add the following variables:

```
VITE_API_BASE_URL=https://frontend-take-home-service.fetch.com
```

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

---

## 🔑 Authentication Flow

1. **Login with Name & Email** (API: `POST /auth/login`)
2. **Receives HttpOnly auth cookie** (`fetch-access-token`)
3. **Session expires in 1 hour**
4. **All routes except login are protected**

### **Authentication Hook: `useAuth.ts`**

- **Check session status** by calling `/dogs/breeds`
- **Handles login & logout** requests
- **Manages authentication state**

---

## 🔍 Features & API Usage

### **1️⃣ Dog Search & Matching**

| API Endpoint       | Functionality                                    |
| ------------------ | ------------------------------------------------ |
| `GET /dogs/breeds` | Fetch all dog breeds                             |
| `GET /dogs/search` | Search dogs using filters (breed, age, zip code) |
| `POST /dogs`       | Fetch dog details using dog IDs                  |
| `POST /dogs/match` | Match a user with a dog                          |

### **2️⃣ Location Search**

| API Endpoint             | Functionality                                      |
| ------------------------ | -------------------------------------------------- |
| `POST /locations`        | Get locations by ZIP codes                         |
| `POST /locations/search` | Search locations by city, state, or geoBoundingBox |

---

## 🔒 Route Protection

- **Implemented via `ProtectedRoute.tsx`**
- **Automatically redirects users** to login if not authenticated
- **Ensures session persistence**

---

## 📂 Project Structure

```
fetch-dog-adoption/
├── src/
│   ├── api/
│   │   ├── axiosInstance.ts  # Axios instance for API calls
│   ├── components/
│   │   ├── LoginForm.tsx  # Login page
│   │   ├── Dogs.tsx  # Dog search & matching
│   │   ├── Locations.tsx  # Location search
│   │   ├── ProtectedRoute.tsx  # Route protection logic
│   ├── services/
│   │   ├── useAuth.ts  # Authentication logic
│   │   ├── useDogs.ts  # Dog-related API logic
│   │   ├── useLocation.ts  # Location API logic
│   ├── utils/
│   │   ├── types.ts  # Type definitions
│   │   ├── constants.ts  # App-wide constants
│   ├── App.tsx  # Main entry point
│   ├── main.tsx  # React rendering
├── .env  # Environment variables
├── README.md  # Documentation
├── package.json  # Dependencies
└── tsconfig.json  # TypeScript configuration
```

---

## 🛠️ Deployment

1. **Build the project:**

```sh
npm run build
```

2. **Deploy to a hosting service (Vercel, Netlify, etc.)**

---

## 🤝 Contributing

- Fork the repo & create a new branch
- Open a Pull Request with detailed changes
- Follow code style guidelines

---

## 📜 License

This project is **MIT Licensed**. Feel free to use and modify it as needed!

🚀 Happy Coding! 🐶❤️
