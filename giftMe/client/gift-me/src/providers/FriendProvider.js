import React, { useState,  createContext } from "react";


export const FriendContext = createContext();

export const FriendProvider =(props) =>{

  const apiUrl = "https://localhost:44392";
  const [Friends, setFriends] = useState([]);
 

  const getAllFriend = () => {
    return fetch(`${apiUrl}/api/Friend`)
      .then((res) => res.json())
      .then(setFriends);
  };

  const getAllFriendByUserProfile = () => {
      debugger
    return fetch(`${apiUrl}/api/Friend`)
      .then((res) => res.json())
      .then(setFriends);
  };

  const addFriend = (friend) => {
  
    return fetch(`${apiUrl}/api/Friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friend)
   
    }).then(getAllFriendByUserProfile);
  
  };  

  const getFriends = (id) => {
    return fetch(`${apiUrl}/api/gifts/${id}`)
    .then((res) => res.json());
};

const getFriendById = (id) => {
    
  return fetch(`${apiUrl}/api/Gift/${id}`)
      .then(res => res.json())

}





//created patch to update the item received field in gifts when gift is received
const patchFriend = (friendId, EndDate) => {
  // https://localhost:44392/api/Gift/23?ItemReceived=true
  return fetch(`${apiUrl}/api/Gift/${friendId}?ItemReceived=${EndDate}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      
      body: JSON.stringify({EndDate: EndDate})
  })
  
}



  return (
    <FriendContext.Provider value={{getAllFriendByUserProfile, Friends, addFriend  }}>
       {props.children}
    </FriendContext.Provider>
  );
}