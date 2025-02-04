# Explore Bangla
Backend server for Explore Bangla tourism management system website.

## Purpose
The server-side application of Explore Bangla powers the backend functionalities for the tourism management system. It ensures smooth data handling, secure authentication, and facilitates core features such as user management, booking operations, and destination data filtering.

## Key Features
- 🔐 Secure User Authentication with JWT <br>
- 📊 RESTful API Endpoints for Seamless Integration <br>
- 💾 MongoDB for Scalable and Reliable Data Storage <br>
- 📉 Efficient Querying and Data Filtering <br>
- ⚙️ Middleware to Enhance Security and Performance <br>
- 🎯 Follows MVC Architecture for Clean and Maintainable Code <br>
- 💳 Stripe Payment Gateway Integration for Secure Transactions <br>
- 🖼️ Image Hosting via IMGBB Server <br>
- 🚀 Deployed on Vercel for Easy Scalability and High Availability


## Technologies Used
The backend application is powered by the following technologies:
- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT) with local storage
- **Payment:** Stripe Gateway
- **Image Hosting:** IMGBB server
- **Hosting Platform:** Vercel

## **NPM Packages**
The following npm packages were utilized:

- [`express`](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [`mongodb`](https://www.npmjs.com/package/mongodb): MongoDB driver for Node.js to interact with MongoDB database.
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken): Library to create and verify JSON Web Tokens (JWT) for authentication.
- [`dotenv`](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`.
- [`cors`](https://www.npmjs.com/package/cors): Middleware to enable Cross-Origin Resource Sharing.
- [`stripe`](https://www.npmjs.com/package/stripe): Node.js library for integrating and managing Stripe Payment Gateway for secure and seamless transactions.
  
## Getting Started
Follow these steps to set up and run the server locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Jakaria030/explore-bangla-server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd explore-bangla-server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```env
   DB_USER=<your database username>
   DB_PASSWORD=<your database password>
   ACCESS_TOKEN_SECRET=<your-jwt-secret>
   STRIPE_SECRET_KEY=<your stripe secrete key>
   ```
5. Start the server:
   ```bash
   npm start
   ```