// src/utils/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthenticatedComponent: React.FC = (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // Redirige a inicio de sesión si no está autenticado
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
