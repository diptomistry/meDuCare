import React from 'react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
    const { user } = useAuth();
    
    // useEffect(() => {
    //     console.log("i am in protected route");
    //       if (!user) {
       
    //    return <Navigate to="/login"  />;
    //  }
       
    // },[]);
   
   

    return children;
};
export default RequireAuth;
