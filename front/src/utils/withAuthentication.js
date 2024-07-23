import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

const withAuthentication = (WrappedComponent) => {
    return function AuthComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [checkingAuth, setCheckingAuth] = useState(true);

        useEffect(() => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            if (token) {
                setIsAuthenticated(true);
                console.log('Token found');
            } else {
                setIsAuthenticated(false);
                console.log('Token not found');
            }
            setCheckingAuth(false);
        }, []);

        if (checkingAuth) {
            return <div>Loading...</div>;
        }

        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        } else {
            return <Navigate to="/login" />;
        }
    }
}

export default withAuthentication;
