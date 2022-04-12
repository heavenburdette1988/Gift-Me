import { Card } from "react-bootstrap";
import { UserContext } from "../../providers/UserProviders";
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { GiftContext } from "../../providers/GiftProvider";
import Gift from "../gifts/Gift";


const UserGiftList = () => {
    
    const { Gifts, getAllGifts } = useContext(GiftContext);
    const { getUserById } = useContext(UserContext);

    const [gift, setGift] = useState({})

   

    const {userId} = useParams();



    useEffect(() => {
        console.log("useEffect", userId)
        getAllGifts().then(() => getUserById(userId)
        )

            }, [])
   

   

      
        

    return (
<>
        {
            Gifts.filter(g => g.userId !== userId).map(g => {
    
               
                   return (<Gift key={g.id} giftProp={g} setGift={setGift} />)
           }
           )
}
 
    
      </>  
        


  
  
    );
  };

  export default UserGiftList;