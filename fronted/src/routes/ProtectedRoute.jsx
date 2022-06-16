import React from 'react';
import { useAuth } from '../services/useAuth';

const ProtectedRoute = ({
    children,
    roles
}) => {

    const { user } = useAuth();

    if (!roles.some(r => user.roles.some(userRole => userRole === r))) {
        return (
            <>
                Unauthorized!
            </>
        )
    }

    return children;
}

export default ProtectedRoute;