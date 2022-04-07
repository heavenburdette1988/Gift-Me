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
   debugger
    return fetch(`${apiUrl}/api/Gift/addToGift`, {
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

const getGiftById = (id) => {
    
  return fetch(`${apiUrl}/api/Gift/${id}`)
      .then(res => res.json())

}


const updateGift = gift => {
  return fetch(`${apiUrl}/api/Gift/${gift.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(gift)
  })
    .then(getAllGifts)
}

const deleteGift = (giftId) => {

  return fetch(`${apiUrl}/api/Gift/${giftId}`, {
      method: "DELETE"
  })
      .then(getAllGifts)
}

const patchTask = (giftId, itemReceived) => {
  // https://localhost:44392/api/Gift/23?ItemReceived=true
  return fetch(`${apiUrl}/api/Gift/${giftId}?ItemReceived=${itemReceived}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      
      body: JSON.stringify({itemReceived: itemReceived})
  })
  
}


  return (
    <GiftContext.Provider value={{ patchTask, getAllGifts, Gifts, setGifts, addGift, getGifts,deleteGift, updateGift, getGiftById }}>
       {props.children}
    </GiftContext.Provider>
  );
}