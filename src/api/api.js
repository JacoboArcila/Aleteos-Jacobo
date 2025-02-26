// api.js - Base Axios instance with NextAuth integration

import axios from 'axios';
import { getSession } from 'next-auth/react';

/**
 * Create a configured Axios instance with default settings
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

/**
 * Request interceptor for API calls that adds auth token from NextAuth
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get session from NextAuth
    const session = await getSession();
    
    // If session exists and has an access token, add it to the request
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for API calls
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this function
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // You might need to trigger a session refresh or redirect to sign-in
      // depending on your NextAuth configuration
      window.location.href = '/api/auth/signin';
      return Promise.reject(error);
    }
    
    // Handle global error responses
    return Promise.reject(error);
  }
);

export default axiosInstance;