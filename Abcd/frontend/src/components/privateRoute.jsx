import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem('role');
    if (!role) {
        return <Navigate to="/login" />;
    }
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/home" />;
    }
    return children;
};

export default PrivateRoute;
