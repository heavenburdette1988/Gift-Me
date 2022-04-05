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

  const getGifts = (id) => {
    return fetch(`${apiUrl}/api/UserProfile/${id}`)
    .then((res) => res.json());
};


  

  return (
    <GiftContext.Provider value={{ getAllGifts, Gifts, setGifts }}>
       {props.children}
    </GiftContext.Provider>
  );
}