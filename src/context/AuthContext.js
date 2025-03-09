'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '@/api/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      // Set the token in the API header
      if (parsedUser.token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      }
    }
    setLoading(false);
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.post('/api/auth/register', userData);
      const { user, token } = response.data;
      
      // Store user in state and localStorage
      const userWithToken = { ...user, token };
      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      
      // Set the token in the API header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'An error occurred during registration');
      return false;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      console.log("response", response);
      const { user, token } = response.data;
      
      // Store user in state and localStorage
      const userWithToken = { ...user, token };
      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      
      // Set the token in the API header
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Invalid credentials');
      return false;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axiosInstance.get('/api/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Even if the API call fails, clear the local state
    setUser(null);
    localStorage.removeItem('user');
    delete axiosInstance.defaults.headers.common['Authorization'];
   // router.push('/login');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.put('/api/auth/updatedetails', userData);
      const updatedUser = response.data.user;
      
      // Update user in state and localStorage with the same token
      const userWithToken = { ...updatedUser, token: user.token };
      setUser(userWithToken);
      localStorage.setItem('user', JSON.stringify(userWithToken));
      
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Error updating profile');
      return false;
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axiosInstance.put('/api/auth/updatepassword', passwordData);
      
      // If token is returned, update it
      if (response.data.token) {
        const userWithNewToken = { ...user, token: response.data.token };
        setUser(userWithNewToken);
        localStorage.setItem('user', JSON.stringify(userWithNewToken));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Error updating password');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        register,
        login,
        logout,
        updateProfile,
        updatePassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);