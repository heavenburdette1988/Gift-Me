import React, { useContext, useEffect } from "react";
import { GiftContext } from "../../providers/GiftProvider";
import Gift from "./Gift";
import {Button } from "reactstrap";
import { useNavigate} from "react-router-dom";

export const GiftList = () => {
    
const { Gifts, getAllGifts } = useContext(GiftContext);

const navigate = useNavigate();

 


useEffect(() => {
getAllGifts()
}, []);

 




return (
    
<div className="gift">
      {console.log("GiftList: Render", Gifts)}
      <Button outline onClick={() => navigate(`/add/Gifts/`)}>
    Create New
  </Button>
  {' '}  
      {
        Gifts.map(singleGiftInLoop => {
        
          return <Gift key={singleGiftInLoop.id} giftProp={singleGiftInLoop} />
          
        })
      }
    </div>
  )
}