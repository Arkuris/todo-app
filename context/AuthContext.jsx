import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
    // State for user's login status
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // State for user details
    const [userDetails, setUserDetails] = useState({
        username: '',
        capabilities: []  // Assuming capabilities is an array of strings e.g. ['read', 'write']
    });

    // Simulated login function
    const login = (username, password) => {
        // Here we'll just simulate a login.
        // In a real application, you'd probably use these credentials against a backend.
        setIsAuthenticated(true);
        setUserDetails({
            username: username,
            // For this example, we'll just hard-code capabilities. In real-world applications,
            // these would be fetched from a backend based on the user.
            capabilities: ['read', 'write', 'delete', 'update'] 
        });
    };

    // Logout function
    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails({ username: '', capabilities: [] });
    };

    // Authorization function to check if user has a specific capability
    const can = (capability) => {
        return userDetails.capabilities.includes(capability);
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            userDetails, 
            login, 
            logout, 
            can 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

