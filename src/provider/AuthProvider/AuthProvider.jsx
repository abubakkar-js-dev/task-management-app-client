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


    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const loginUser = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const updateUser = (updatedInfo)=>{
        return updateProfile(auth.currentUser,updatedInfo);
    }

    const signInWithGoogle = ()=>{
        return signInWithPopup(auth,googleProvider);
    }

    const signOutUser = ()=>{
        return signOut(auth);
    }

    const authInfo = {
        createUser,
        loginUser,
        updateUser,
        signInWithGoogle,
        signOutUser,
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