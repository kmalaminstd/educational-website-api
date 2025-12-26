# 🎓 EducationWebsite - Server Documentation

A comprehensive backend API for an online education platform built with **Express.js**, **Node.js**, and **MySQL**. This platform enables instructors to create and manage courses, handle student enrollments, process payments, and track learning progress.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
  - [Authentication APIs](#authentication-apis)
  - [User APIs](#user-apis)
  - [Admin APIs](#admin-apis)
  - [Course APIs](#course-apis)
  - [Enrollment APIs](#enrollment-apis)
  - [Payment APIs](#payment-apis)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Security Features](#security-features)

---

## 🎯 Project Overview

EducationWebsite is a full-fledged **Online Learning Management System (LMS)** that bridges the gap between instructors and students. It provides:

- **For Students**: Browse courses, enroll in classes, make payments, track learning progress
- **For Instructors**: Create and manage courses, upload course content (videos, modules), track student progress
- **For Admins**: Manage all users, courses, instructors, payments, categories, and system analytics

### Core Ideas

1. **Multi-Role System**: Separate authentication and features for users, instructors, and admins
2. **Course Management**: Hierarchical structure (Courses → Modules → Videos)
3. **Payment Integration**: Track and manage student payments with status verification
4. **Email Notifications**: Automated emails for enrollments, payments, account status changes
5. **File Management**: Upload and serve course images, instructor photos, and user profiles
6. **Analytics Dashboard**: Real-time statistics and payment reports for admins

---

## ✨ Key Features

### 👤 User Features
- ✅ User registration with email verification
- ✅ Secure login with JWT authentication
- ✅ View active courses and course details
- ✅ Enroll in courses with payment
- ✅ Access enrolled course content (videos, modules)
- ✅ View payment history and status
- ✅ User profile management
- ✅ Session management with cookies

### 👨‍🏫 Instructor Features
- ✅ Instructor profile creation and management
- ✅ Create and publish courses
- ✅ Organize content into modules
- ✅ Add video lessons to modules
- ✅ Update course information and images
- ✅ Track enrolled students

### 🛡️ Admin Features
- ✅ Complete user management (view, ban, unblock)
- ✅ Instructor management (add, edit, deactivate)
- ✅ Course management (create, edit, activate/deactivate, delete)
- ✅ Category management (add, update, delete)
- ✅ Payment tracking and status management
- ✅ Enrollment monitoring
- ✅ Dashboard analytics (overview stats, monthly comparisons)
- ✅ Download payment reports (Excel)
- ✅ User account control (block, unblock, ban)

### 📊 Payment & Enrollment
- ✅ Payment status tracking (pending, completed, failed, refunded)
- ✅ Multiple payment methods support
- ✅ Transaction ID tracking
- ✅ Automatic enrollment upon successful payment
- ✅ Payment refund management
- ✅ Email notifications for payment updates

### 📧 Email Notifications
- ✅ Enrollment approval notifications
- ✅ Payment success/failure alerts
- ✅ Account status change notifications
- ✅ Account block/ban alerts
- ✅ Account restore appeal notifications
- ✅ Refund confirmations

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Runtime** | Node.js |
| **Framework** | Express.js 5.1.0 |
| **Database** | MySQL |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Hashing** | bcrypt |
| **File Upload** | Multer |
| **Email Service** | Nodemailer |
| **Excel Generation** | ExcelJS |
| **Environment Config** | dotenv |
| **Dev Tool** | Nodemon |
| **CORS** | Enabled for local frontend |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MySQL Server
- npm or yarn

### Step 1: Clone & Install Dependencies
```bash
cd server
npm install