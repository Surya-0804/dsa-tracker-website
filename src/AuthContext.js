import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const savedToken = localStorage.getItem('token');
        if (user && savedToken) {
            setCurrentUser(user);
            setToken(savedToken);
        }
    }, []);

    const login = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setCurrentUser(user);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
        setToken(null);
    };

    const signup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            return { user, token };
        } catch (error) {
            console.error("Error signing up: ", error.message);
            throw new Error(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, token, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
