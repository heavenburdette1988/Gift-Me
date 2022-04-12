
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { UserContext, UserProvider } from "../providers/UserProviders";

import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { GiftList } from "./gifts/GiftList";
import { GiftProvider } from "../providers/GiftProvider";
import { GiftForm } from "./gifts/GiftForm";

import { FriendProvider } from "../providers/FriendProvider";
import { FriendList } from "./friends/FriendList";
import { UserList } from "./users/UserList";
import UserProfile from "./users/UserProfile";
import UserGiftList from "./users/UserGiftList";





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
      <FriendProvider>
            <Routes>
       
            <Route path="/userDashboard" element={<GiftList/>} /> 
            <Route path="/add/gifts" element={<GiftForm />} /> 
            <Route path="gifts/edit/:giftId/*" element={<GiftForm />} />   
            <Route path="/users" element={<UserList/>} />   
            <Route path="/user/:userId" element={<><UserProfile/><UserGiftList/></>} />   
                       
          </Routes>
          </FriendProvider>
          </GiftProvider>
      </UserProvider>
  
  
     );
    }
  }