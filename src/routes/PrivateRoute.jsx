import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
const {user,loading} = useAuth();
console.log(loading);

    if(loading){
        return <Loading />
    }

    if(user){
        return children;
    }

    return <Navigate to="/login"  replace/>
};

export default PrivateRoute;