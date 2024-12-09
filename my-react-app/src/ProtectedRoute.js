// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole'); 

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return userRole === 'admin' 
            ? <Navigate to="/dashboard" replace /> 
            : <Navigate to="/productlist" replace />;
    }

    return children;
};

export default ProtectedRoute;