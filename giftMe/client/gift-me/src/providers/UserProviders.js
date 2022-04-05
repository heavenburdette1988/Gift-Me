import React, { useState, useEffect, createContext } from "react";


export const UserContext = createContext();

export const UserProvider =(props) =>{

  const apiUrl = "https://localhost:44392";
  const [userProfiles, setUserProfiles] = useState([]);
  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);


  const getAllUserProfiles = () => {
    return fetch(`${apiUrl}/api/UserProfile`)
      .then((res) => res.json())
      .then(setUserProfiles);
  };

  const getUser = (id) => {
    return fetch(`${apiUrl}/api/UserProfile/${id}`)
    .then((res) => res.json());
};


  const login = (userObject) => {
    return fetch(`${apiUrl}/api/User/GetByEmail?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          setIsLoggedIn(true);
          return userProfile
        }
        else{
          return undefined
        }
      });
  };


  const logout = () => {
        sessionStorage.clear()
        setIsLoggedIn(false);
  };

  const register = (userObject, password) => {
   
      return  fetch(`${apiUrl}/api/User`, {
        //   https://localhost:44392/api/User
      method: "POST",
     
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
 

  };





  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout, register, getAllUserProfiles,
                                     userProfiles, userProfile, setUserProfiles, getUser  }}>
       {props.children}
    </UserContext.Provider>
  );
}