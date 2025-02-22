import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext/AuthContext';

const useAuth = () => {
    const auth = useContext(AuthContext);
    if(auth){
        return auth;
    }
    return null;
};

export default useAuth;