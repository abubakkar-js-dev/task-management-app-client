import React, { useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.config.js';

const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);
    const [error,setError] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    console.log(user);
    console.log(user?.uid);


    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const loginUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const updateUser = (updatedInfo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,updatedInfo);
    }

    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const signOutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        createUser,
        loginUser,
        updateUser,
        signInWithGoogle,
        signOutUser,
        user,
        setUser,
        loading,
        error

    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user);
            setLoading(false);
        });
        return ()=>{
            unsubscribe();
        }
    },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;