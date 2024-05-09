import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
   
    useEffect(() => {
        console.log("i am here");
        const token = localStorage.getItem('token');
        if (token) {
            
            fetchUserData(token);
        } else {
            // Optionally handle the absence of a token (e.g., redirect to login)
            console.log('No token found, user is not logged in.');
        }
    },[]);
  
    const fetchUserData = async (token) => {
        console.log("i am here");
        try {
            const response = await axios.post('http://localhost:8000/api/users', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log(response.data.user);
            setUser(response.data.user); 
           
            // if(response.data.user.role === "admin"){
            //     window.location.href = "/dashboard/admin";
            //   }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setUser(null); // Clear user data on error
        }
    };
    useEffect(() => {
        // This code runs after `user` is updated
        // console.log(user);
    }, [user]); // 

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        // Optionally redirect to login
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
