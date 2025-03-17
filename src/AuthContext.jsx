import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for existing token on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('userEmail');
        if (token && storedEmail) {
            setUser({ email: storedEmail });
        }
    }, []);

    const login = (token, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', email); // Store email as well
        setUser({ email });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};