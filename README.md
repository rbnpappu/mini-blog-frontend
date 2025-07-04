# 📰 Fullstack Blog Frontend – Next.js 14+ App Router

This project is a modern frontend blog application built with **Next.js 14+**, **TypeScript**, **Tailwind CSS**, **MUI**, and **Redux Toolkit**. It supports blog post creation, editing, deletion (admin only), and viewing by users — all powered via a free blog API.

---

## 🚀 Features

- ✅ Admin Panel (`adminposts`) to **create, edit, update, delete** posts
- ✅ User-facing blog with detailed post view (`posts/[id]`)
- ✅ API integrations via `src/app/api` for seamless admin/user actions
- ✅ Global **error handling** and **loading bar**
- ✅ Fully responsive for **mobile screens**
- ✅ Built using:
  - **Next.js 14+** with **App Router**
  - **TypeScript / .tsx**
  - **Tailwind CSS** + **MUI**
  - **Redux Toolkit** for state management

---

## 📦 Project Structure Overview

MINI-BLOG_FRONTEND/
├── app/
│ ├── page.tsx # Home route
│ ├── admin/ # Admin UI (CRUD posts)
│ │ └── page.tsx
     └── [id]/page.tsx # View single post update/delete
│ ├── posts/ # User blog post pages
│ │ ├── page.tsx # List of posts
│ │ └── [id]/page.tsx # View single post
│ └── layout.tsx # App Router layout wrapper
│
├── api/ # API functions for getposts/getAdminposts/createPostByAdmin/updatePostByAdmin/deletePostByAdmin
│ ├── api.ts
│
├── redux/ # Redux Toolkit setup
│ ├── store.ts
│ └── blogSlice.ts
│
├── components/ # Reusable components (adminposts, error, loading, posts)
├── public/ # Static assets
├── styles/ # Global styles if any
├── .env.local # Environment variables
├── next.config.js
└── tsconfig.json

## 🛠️ Setup Instructions

### 📦 1. Install Dependencies

```bash
npm install

## For Run Instructions
npm run dev


#   m i n i - b l o g - f r o n t e n d  
 