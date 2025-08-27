# 🧵 CraftedNest — Discover Handcrafted Treasures

**CraftedNest** is an online marketplace that bridges the gap between passionate local artisans and customers seeking unique, handcrafted goods. Built using **Next.js**, the platform delivers a fast, seamless, and mobile-friendly experience, empowering creators to showcase and sell their beautiful creations with ease.

---

## ✨ Features

🛍️ **Marketplace for Handcrafted Goods**  
Explore a diverse range of authentic handmade items crafted by local artisans.

🧵 **Artisan Profiles**  
Each seller gets a personalized profile to tell their story and display their work.

📦 **Product Listings**  
Artisans can easily add, update, or delete their products with images, descriptions, and pricing.

⚡ **Blazing Fast Performance**  
Built with Next.js for optimized performance, server-side rendering, and smooth navigation.

📱 **Fully Responsive Design**  
Shop and manage your store on any device — mobile, tablet, or desktop.

🔐 **Authentication & Authorization**  
Secure login/signup for users and sellers with role-based access control.

🌐 **Cloud Image Hosting** 
Product images are stored using Cloudinary for fast and reliable delivery.

---

## 🛠️ Tech Stack

- **Framework:** Next.js  
- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express 
- **Database:** MongoDB  
- **Authentication:** JWT, NextAuth 
- **Image Uploads:** Cloudinary, Multer 

---

## 🖼️ Preview

### 🔹 Home Page  
<img width="1829" height="927" alt="Screenshot 2025-05-12 121510" src="https://github.com/user-attachments/assets/c73e06a5-8f91-4e81-9bfa-e467770fcc40" />


---


### Frontend
- **Responsive Design**: Ensures seamless user experience across devices.
- **Dynamic Pages**:
  - Explore Page: Browse curated categories of handmade crafts.
  - About Page: Learn more about the platform and its mission.
  - Profile Page: View and edit user profiles.
- **Next.js Image Optimization**: Replaced `<img>` tags with `<Image />` for better performance.
- **Client-Side Navigation**: Integrated `useSearchParams` for dynamic query handling.

### Backend
- **Firebase Integration**:
  - Authentication: Google login for secure access.
  - Firestore Database: Store user and craft data.
  - Cloud Storage: Manage craft images.
- **Middleware**:
  - Authentication Middleware: Protect routes.
  - Multer Middleware: Handle file uploads.

### Deployment
- **Vercel**: Optimized for serverless deployment.
- **Next.js Configuration**: Added external image domains for compatibility.


## Deployment

The project is deployed on Vercel. Visit the live site [here](https://craftednest.vercel.app).




## Technologies Used

### Authentication
- **Firebase**: Used for login and signup due to its simplicity and robust authentication features.

### Database
- **MongoDB**: Utilized for storing images and other data, providing scalability and flexibility for the application.
