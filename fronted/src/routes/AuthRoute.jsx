import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from '../components/commons/Spinner';
import { useAuth } from '../services/useAuth';

const AuthRoute = ({
    children
}) => {

    const { isLoading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <Spinner />;
    }

    if (isAuthenticated) {
        return <Navigate to={location?.state?.from ? location.state.from : '/'} replace />;
    }

    return children;
}

export default AuthRoute;