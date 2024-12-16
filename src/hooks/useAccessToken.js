import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAccessToken = () => {
    const [hasAccessToken, setHasAccessToken] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        setHasAccessToken(!!token);
    }, [location]);

    return hasAccessToken;
};

export default useAccessToken;