import React, { useState, useEffect, createContext } from "react";


export const UserContext = createContext();

export const UserProvider =(props) =>{

  const apiUrl = "https://localhost:44392";
  const [userProfiles, setUserProfiles] = useState([]);
  const [userProfilesForSideBar, setUserProfilesForSideBar] = useState([]);
  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);


  const getAllUserProfiles = () => {
    debugger
    return fetch(`${apiUrl}/api/User`)
      .then((res) => res.json())
      .then(setUserProfiles);
  };

  const getAllUserProfilesByDOB = () => {
    return fetch(`${apiUrl}/api/User/GetByDOB`)
      .then((res) => res.json())
      .then(setUserProfilesForSideBar);
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
  const getUserById = (id) => {
    return fetch(`${apiUrl}/api/User/${id}`)
        .then(res => res.json())

}
const searchUserExplore = (query) => {
  return fetch(`https://localhost:44369/api/User/search?q=${query}`)
  .then((res) => res.json())
  .then(setUserProfiles);
};



  return (
    <UserContext.Provider value={{ userProfilesForSideBar, searchUserExplore,isLoggedIn, login, logout, register, getAllUserProfiles,
                                     userProfiles, userProfile, setUserProfiles, getUser,getUserById, getAllUserProfilesByDOB  }}>
       {props.children}
    </UserContext.Provider>
  );
}