
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { UserContext, UserProvider } from "../providers/UserProviders";

import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { GiftList } from "./gifts/GiftList";
import { GiftProvider } from "../providers/GiftProvider";





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
      <GiftProvider>
            <Routes>
    
            <Route path="/gifts" element={<GiftList />} /> 
                       
          </Routes>
          </GiftProvider>
      </UserProvider>
  
  
     );
    }
  }