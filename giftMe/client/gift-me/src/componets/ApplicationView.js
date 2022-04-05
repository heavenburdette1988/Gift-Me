
import Login from "./Login";
import Register from "./Register";
import { UserProfileContext } from "../providers/UserProviders";

import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  UserContext,
  UserProvider,
} from "../providers/UserProvider";



export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserContext);
  
    if (!isLoggedIn) {
      return (  
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />      
        </Routes> 
      );
    }
    else{
     return(
       <UserProvider>
      
            <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/users" element={<UserList />} />
           
            
          </Routes>
       
      </UserProvider>
  
  
     );
    }
  }