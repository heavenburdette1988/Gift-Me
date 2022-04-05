import React, { useState,  createContext } from "react";


export const GiftContext = createContext();

export const GiftProvider =(props) =>{

  const apiUrl = "https://localhost:44392";
  const [Gifts, setGifts] = useState([]);
 

  const getAllGifts = () => {
    return fetch(`${apiUrl}/api/Gift`)
      .then((res) => res.json())
      .then(setGifts);
  };

  const addGift = (gift) => {
    return fetch(`${apiUrl}/api/Gift`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gift)
   
    }).then(getAllGifts);
  
  };  

  const getGifts = (id) => {
    return fetch(`${apiUrl}/api/gifts/${id}`)
    .then((res) => res.json());
};


  

  return (
    <GiftContext.Provider value={{ getAllGifts, Gifts, setGifts, addGift, getGifts }}>
       {props.children}
    </GiftContext.Provider>
  );
}