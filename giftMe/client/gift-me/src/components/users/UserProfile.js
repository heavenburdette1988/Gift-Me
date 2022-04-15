import { Card, Offcanvas } from "react-bootstrap";
import { UserContext } from "../../providers/UserProviders";
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { GiftList } from "../gifts/GiftList";
import { UserFriend } from "./UserFriend";
import './User.css'
import '../gifts/Gift.css'
import UserGiftList from "./UserGiftList";


const UserProfile = () => {
 
    const { getUserById } = useContext(UserContext)

    const [user, setUser] = useState({})
   

	const {userId} = useParams();

  
    useEffect(() => {
        console.log("useEffect", userId)
        getUserById(userId)
        .then((response) => {
          setUser(response)
        })
        }, [])
    
       


    return (
<>
<div className="UserProfileMainContainer">
<div className="userProfileM">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={user.imageLocation} />
        <Card.Body>
          <Card.Title>{user.firstName} {user.lastName}</Card.Title>
          <Card.Text>
           <strong> About {user.displayName}: </strong>{user.about}
       
          </Card.Text>
          </Card.Body>
      </Card>
      </div>
      <div className="GiftUserList">
      <UserGiftList/>
      </div>

      <div className="FriendsUserList">
    <UserFriend/>
    </div>
    </div>
    </>
  
  
    );
  };
  
  export default UserProfile;