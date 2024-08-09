import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('jwtToken');
    return isAuthenticated ? children : <Navigate to="/register" />;
};

export default PrivateRoute;
