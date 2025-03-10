# Mircoservice_Template_Backend

# Microservices Backend

A microservices-based backend architecture for an application built with Node.js, Express, and MongoDB.

## Architecture

The application is divided into three main microservices:

- **Gateway Service** (Port 8000): API Gateway that routes requests to appropriate services
- **User Service** (Port 8001): Handles user authentication and management
- **Product Service** (Port 8002): Manages product-related operations

## Features

- API Gateway for request routing and load balancing
- User authentication and authorization with JWT
- Product management
- MongoDB database integration
- Cross-origin resource sharing (CORS) support
- Cookie-based authentication
- Input validation and error handling

## Prerequisites

- Node.js >= 14.x
- MongoDB >= 4.x
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mircroservice-back


# Gateway Service
cd Gateway && npm install

# User Service
cd ../User && npm install

# Product Service
cd ../Product && npm install

# Gateway Service
cd Gateway && npm start

# User Service
cd User && npm start

# Product Service
cd Product && npm start

API Endpoints
User Service
POST /user/signup - Register new user
POST /user/login - User login
POST /user/verify - Verify user account
GET /user/me - Get user profile
POST /user/logout - User logout
POST /user/resend - Resend verification OTP
Product Service
GET /product/all - Get all products
GET /product/authall - Get authenticated products list
Technologies Used
Node.js
Express.js
MongoDB with Mongoose
JSON Web Tokens (JWT)
bcrypt for password hashing
http-proxy-middleware for API Gateway




You can save this as `README.md` in your project's root directory. The documentation includes:

1. Project overview
2. Architecture explanation
3. Feature list
4. Installation instructions
5. Running instructions
6. API endpoint documentation
7. Technology stack


To use this README, you may need to:

1. Replace `<repository-url>` with your actual repository URL
2. Add any additional environment variables required
3. Modify the API endpoints section based on your actual implementations
4. Add any specific configuration requirements
5. Update the technology versions if needed

