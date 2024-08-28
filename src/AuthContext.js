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

    const signup = async (email, password, name, phoneNo) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                name,
                phoneNo
            }),
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error data:", errorData);
            throw new Error(errorData.message || "Failed to register");
        }

        const data = await response.json();
        login(data.user, data.token);
        return { user: data.user, token: data.token };

    } catch (error) {
        console.error("Failed to signup:", error);
        throw error;
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
