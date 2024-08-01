// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

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

    return (
        <AuthContext.Provider value={{ currentUser, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
