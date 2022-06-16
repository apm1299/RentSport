import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from '../components/commons/Spinner';
import { useAuth } from '../services/useAuth';

const RequireAuth = ({
    children
}) => {

    const { isLoading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <Spinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/entrar" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;