import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
        // Jika token tidak ada, arahkan ke halaman login
        return <Navigate to="/login" replace />;
    }

    // Jika ada token, tampilkan halaman yang diminta (children)
    return children;
};

export default ProtectedRoute;
