# Blog Application

This is a full-stack blog application that allows users to create, update, and view blogs. Users can sign up, log in, and manage their profiles and blog posts by different categories.

## Tech Stack

### Frontend

- **Next.js** - React framework for server-side rendering and static site generation
- **ShadCN** - For UI components and styling
- **TanStack React Query** - For data fetching and state management
- **Axios** - For making HTTP requests
- **Moment.js** - For date and time formatting
- **React Quill** - For rich text editing in blog content

### Backend

- **Express.js** - Lightweight Node.js framework for building RESTful APIs
- **MySQL** - Relational database to store user and blog data
- **Bcrypt** - For password hashing
- **JWT (JSON Web Token)** - For secure authentication
- **Multer** - For handling file uploads (profile images, blog images)
- **Moment.js** - For timestamp management

---

## Features

### Authentication

- User registration with password hashing (using `bcrypt`)
- Login with JWT-based authentication
- Protected routes for creating, updating, and deleting blogs

### User Management

- Update user profile (username, email, profile picture)

### Blog Management

- Create and edit blog posts with rich text content (using `React Quill`)
- Categorize blogs by topic
- View blogs posted by other users

### Additional Features

- Image upload with `Multer`
- Date formatting with `Moment.js`

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/harshshukla2002/blogsapp.git
cd blogsapp
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

### 3. Environment Variables

Create `.env` files in both the **frontend** and **backend** directories.

#### Frontend `.env`

```
NEXT_PUBLIC_API_URL=http://localhost:4001/api
```

#### Backend `.env`

```
JWT_KEY=your_secret_key
```

---

## Usage

### 1. Run Backend Server

```bash
cd server
npm start
```

### 2. Run Frontend Application

```bash
cd client
npm run dev
```

The application will be available at **`http://localhost:3000`**.

---

## API Endpoints

### **Auth Routes**

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT token

### **User Routes**

- `PUT /api/users/delete/:id` - Update user profile (with `Multer` for image uploads)
- `DELETE /api/users/delete/:id` - Delete user profile

### **Blog Routes**

- `POST /api/blogs` - Create a new blog post
- `PUT /api/blogs/update/:id` - Edit an existing blog post
- `GET /api/blogs` - Get all blog posts (filtered by category)
- `GET /api/blogs/delete/:id` - Delete blog posts

---

## Folder Structure

```
|-- client
    |-- components
    |-- app
    |-- public
    |-- utils
|-- server
    |-- controllers
    |-- middlewares
    |-- models
    |-- routes
    |-- index.js
```
