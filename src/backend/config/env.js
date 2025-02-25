// src/Backend/config/env.js
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define all environment variables here
const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Add any other environment variables your app needs
};

// Validate required environment variables
const requiredEnvs = ['MONGODB_URI'];
const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvs.join(', ')}`);
}

export default config;