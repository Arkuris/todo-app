// src/context/Auth/index.jsx
import React, { createContext, useState } from 'react';
import axios from '../hooks/axios.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post('/signin', { username, password });
      const { token, user } = response.data;
      localStorage.setItem('authToken', token); // Store the token in local storage
      setAuthToken(token); // Update state with the token
      setUser(user); // Update state with the user details
      setIsAuthenticated(true); // Update authentication state
    } catch (error) {
      console.error("Login failed: ", error.response);
      // Handle the error according to your UI needs, maybe set an error message state
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove the token from local storage
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  // A function to check user capabilities, assuming 'capabilities' is a part of the user object
  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, authToken, login, logout, can }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
