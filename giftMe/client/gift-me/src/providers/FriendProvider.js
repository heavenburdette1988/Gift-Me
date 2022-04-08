import React, { useState,  createContext } from "react";


export const FriendContext = createContext();

export const FriendProvider =(props) =>{

  const apiUrl = "https://localhost:44392";
  const [Friends, setFriends] = useState([]);
 



  const getAllFriends = () => {
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
   
    }).then(getAllFriends);
  
  };  







//created patch to update the item received field in gifts when gift is received
const patchFriend = (friendId, EndDate) => {
  // https://localhost:44392/api/Friend/11
  return fetch(`${apiUrl}/api/Friend/${friendId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      
      body: JSON.stringify({EndDate: EndDate})
  })
  
}



  return (
    <FriendContext.Provider value={{patchFriend,getAllFriends, Friends, addFriend  }}>
       {props.children}
    </FriendContext.Provider>
  );
}