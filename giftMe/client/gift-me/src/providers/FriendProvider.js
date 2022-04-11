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



  const deleteFriend = (friendId) => {

    return fetch(`${apiUrl}/api/Friend/${friendId}`, {
        method: "DELETE"
    })
        .then(getAllFriends)
  }



  return (
    <FriendContext.Provider value={{deleteFriend,getAllFriends, Friends, addFriend  }}>
       {props.children}
    </FriendContext.Provider>
  );
}