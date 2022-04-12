import React, { useContext, useEffect } from "react";
import { GiftContext } from "../../providers/GiftProvider";
import Gift from "./Gift";
import {Button } from "reactstrap";
import { useNavigate} from "react-router-dom";
import { FriendList } from "../friends/FriendList";
import { EventList } from "../events/EventList";

export const GiftList = () => {
    
const { Gifts, getAllGifts } = useContext(GiftContext);

const navigate = useNavigate();

 


useEffect(() => {
getAllGifts()
}, []);

 

const user = JSON.parse(sessionStorage.getItem("userProfile"))


return (
 <>
<div className="gift">
      {console.log("GiftList: Render", Gifts)}
      <Button outline onClick={() => navigate(`/add/gifts/`)}>
    Create New
  </Button>
  {' '}

  <div className="UserDashboard"> 
  
      {
        Gifts.filter(g => g.userId === user.id).map(singleGiftInLoop => {
        
          return <Gift key={singleGiftInLoop.id} giftProp={singleGiftInLoop} />
          
        })

     }
     </div>
      <div className="friendList">
    <FriendList/>
    </div>
    <div>
      <EventList/>
    </div>
    </div>

   
    </>   

  )
}