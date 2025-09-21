# Multivendor E-Commerce Platform (MERN Stack)

## 1. Introduction
This project is a multivendor e-commerce platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js) along with Socket.IO for real-time chat between customers and sellers.
The goal was to design a scalable application that allows multiple sellers to list and manage their products, while customers can browse, purchase, and pay securely.  

An admin panel was also developed to manage sellers, customers, and transactions.  

This project simulates real-world e-commerce platforms such as **Amazon, Flipkart, or Daraz**, and was built as a mega practice project to strengthen full-stack development skills.  

---

## 2. Problem Statement
Traditional e-commerce projects are usually single-vendor systems where only the platform owner manages products. Such systems lack scalability and limit product diversity.  

**The problem solved here:**
- Sellers need their own dashboards to manage shops and products.  
- Customers should have a smooth shopping experience with carts, wishlists, and secure checkouts.  
- Admins need central control over sellers and transactions.
- Communication between buyers and sellers is key for trust.

A multivendor e-commerce system solves all these challenges by supporting multiple roles and features.  

---

## 3. Objectives
- Build a full-stack e-commerce platform with role-based access (**Customer, Seller, Admin**).  
- Provide a seamless customer experience (browse, cart, checkout, payments).  
- Create a dedicated seller dashboard for product and order management.  
- Develop an admin control panel to manage users, sellers, and transactions.  
- Integrate payment gateways for secure transactions.
- Provide real-time chat between sellers and customers using Socket.IO.
- Deploy the project with cloud services for real-world accessibility.  

---

## 4. Tech Stack

### Frontend
- React.js (UI framework)  
- Redux Toolkit (state management)  
- React Router (navigation)  
- Tailwind CSS (styling)  

### Backend
- Node.js & Express.js (REST API development)  
- MongoDB with Mongoose (NoSQL database)  

### Authentication & Security
- JWT (JSON Web Token) for authentication  
- Bcrypt for password hashing

### Real-Time Communication
- Socket.IO (real-time chat between sellers and customers)

### Payments
- Stripe (card payments)  
- PayPal (alternative gateway)  

### Deployment
- Netlify (frontend)  
- Render/Heroku (backend)  
- MongoDB Atlas (cloud database)  

---

## 5. System Architecture
```mermaid
flowchart LR
    subgraph Frontend [Frontend - React]
        C[Customer]
        S[Seller]
        A[Admin]
    end

    subgraph Backend [Backend - Node.js + Express]
        API[REST API]
        Socket[Socket.IO Server]
    end

    subgraph Database [Database - MongoDB Atlas]
        DB[(Users, Products, Orders, Payments, Messages)]
    end

    subgraph Payments [Payment Gateways]
        Stripe[Stripe API]
        PayPal[PayPal API]
    end

    C -->|Browse/Buy| Frontend
    S -->|Manage Shop| Frontend
    A -->|Manage Platform| Frontend

    Frontend --> API
    API --> DB
    Socket <--> DB
    C <-->|Chat| Socket
    S <-->|Chat| Socket

    API --> Stripe
    API --> PayPal


At a high level, the system follows a client-server architecture:  

- **Frontend (React):** Handles UI/UX for customers, sellers, and admin.  
- **Backend (Node/Express):** Provides REST APIs for authentication, product management, order processing, and payments.  
- **Database (MongoDB):** Stores user, product, order, and payment data.  
- **Socket.IO:** Enables real-time communication.
- **Payment Gateway (Stripe/PayPal):** Processes secure transactions.  

---

## 6. Features

### 👤 Customer Features
- Register/Login with authentication  
- Browse products by category and search  
- Add items to cart and wishlist  
- Place orders and checkout securely  
- Online payments via Stripe/PayPal  
- View order history and statuses
- Chat with sellers in real-time

### 🛒 Seller Features
- Register as a seller and create a shop  
- Seller dashboard for product management  
- Add, update, and delete products  
- Manage orders from customers  
- Track sales performance  
- Respond to customer queries in real-time via chat

### 👨‍💼 Admin Features
- Approve/reject seller requests  
- Manage all users (customers & sellers)  
- Monitor transactions and order statuses  
- View platform analytics and reports  
- Handle disputes or escalations  

---

## 7. Database Schema (Entities)
📍 *[Class/ER Diagram Placeholder – will be added later]*  

**Main Entities:**  
- User (id, name, email, role, passwordHash)  
- Seller (id, shopName, userId, products[])  
- Product (id, name, price, stock, sellerId, category)  
- Order (id, customerId, productIds, status, paymentId)  
- Payment (id, orderId, method, status, amount) 
- Message (id, senderId, receiverId, message, timestamp) 

**Relationships:**  
- One seller → many products  
- One customer → many orders  
- One order → many products  
- One order → one payment  

---

## 8. Workflows

📍 *[Sequence Diagrams Placeholder – will be added later]*  

**Customer Checkout Flow**  
1. Customer adds product to cart  
2. Customer places order → Backend processes  
3. Payment request sent to Stripe/PayPal  
4. Payment confirmation returned  
5. Order saved in database  

**Seller Product Management Flow**  
1. Seller logs in → accesses dashboard  
2. Adds/updates/deletes products  
3. Backend updates database  
4. Products instantly visible to customers

**Real-Time Chat Flow**
1. Customer opens product page → initiates chat with seller
2. Socket.IO establishes a connection
3. Messages exchanged in real-time
4. Messages stored in database for history

**Admin Seller Approval Flow**  
1. Seller requests approval  
2. Admin reviews request  
3. Admin approves/rejects seller  
4. Seller status updated in database  

---

## 9. Challenges & Solutions
- **Role-based authentication:** Handled using JWT with role verification middleware.  
- **Database design for sellers/products:** Created relational mapping in MongoDB (seller ↔ products).  
- **Payment gateway integration:** Implemented Stripe for secure payments and fallback with PayPal.  
- **Scalability concerns:** Modularized backend routes and used Redux for scalable state management.  
- **Deployment issues:** Used Netlify for frontend, Render for backend, and MongoDB Atlas for database.  

---

## 10. Results & Learnings
- Built a fully functional multivendor e-commerce platform.  
- Learned end-to-end development with MERN stack.  
- Gained experience with real-world workflows like seller onboarding, payment integration, and admin approval systems.  
- Improved understanding of authentication, authorization, and database relationships.  
- Strengthened deployment and project structuring skills.   

---

## 12. Conclusion
This multivendor e-commerce platform successfully replicates real-world marketplace functionality with separate roles for customers, sellers, and admin.   

---
