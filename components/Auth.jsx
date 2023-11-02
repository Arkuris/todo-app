import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const Auth = ({ children, capability }) => {
    // Use the AuthContext
    const { isAuthenticated, can } = useContext(AuthContext);

    // Check if the user is logged in and has the required capability
    if (isAuthenticated && can(capability)) {
        return <>{children}</>;
    } else {
        // Hide the entire interface if the user isn't logged in
        return null;
    }
};

export default Auth;
