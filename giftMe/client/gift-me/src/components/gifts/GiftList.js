import React, { useContext, useEffect,useState } from "react";
import { GiftContext } from "../../providers/GiftProvider";
import Gift from "./Gift";
import {Button } from "reactstrap";
import { useNavigate} from "react-router-dom";
import { FriendList } from "../friends/FriendList";
import  EventList  from "../events/EventList";
import './Gift.css'
import { Offcanvas } from "react-bootstrap";

export const GiftList = () => {
    
const { Gifts, getAllGifts } = useContext(GiftContext);

const navigate = useNavigate();

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);



useEffect(() => {
getAllGifts()
}, []);

 

const user = JSON.parse(sessionStorage.getItem("userProfile"))


return (
 <>
  {console.log("GiftList: Render", Gifts)}
      <Button outline onClick={() => navigate(`/add/gifts/`)}>
    Create New
  </Button>
  {' '}
  <Button variant="primary" onClick={handleShow} >
        Birthdays
      </Button>

  <div className="giftList">
  <div className="giftListColumn">
  <h2>Gift List</h2>
      {
        Gifts.filter(g => g.userId === user.id).map(singleGiftInLoop => {
        
          return <Gift key={singleGiftInLoop.id} giftProp={singleGiftInLoop} />
          
        })

     }
     </div>
          <div className="friendListColumn">
    <FriendList/>
    </div>
    </div>
    
    <Offcanvas show={show} onHide={handleClose}>
    <div className="EventListColumn">
      <EventList/>
    </div>
    </Offcanvas>
   
 

   
    </>   

  )
}