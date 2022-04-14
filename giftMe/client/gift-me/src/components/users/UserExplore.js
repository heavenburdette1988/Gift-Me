import { useNavigate} from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import React, {useContext, useState,  useEffect  } from "react";
import { FriendContext } from "../../providers/FriendProvider";
import './User.css'

  const UserExplore = ({ UserProp }) => {

    const user = JSON.parse(sessionStorage.getItem("userProfile"))
    const {addFriend, getAllFriends, Friends} = useContext(FriendContext)

    //This state is add Friend
    const [Friend, setFriend] = useState({
        profileUserId: +UserProp.id,
        subscriberUserId: +user.id,
       
          })

        const [userProfile, setUserProfile] = useState({})

    const navigate = useNavigate();
   
    
    useEffect(() => {

      getAllFriends()
      }, []);

    const handleAddFriend = (event) => {
       
                    addFriend(Friend)
                  .then(navigate("/userDashboard"));
           }
          
          

  return (

    
    
<div className="ExploreCard">
    <Card style={{ width: '18rem' }}>
   
  <Card.Img variant="top" src={UserProp.imageLocation} />
  <Card.Body>
    <Card.Title>{UserProp.displayName}</Card.Title>
    <Card.Text>
    {UserProp.firstName}  {UserProp.lastName}
    </Card.Text>
    <Button variant="primary" onClick={handleAddFriend}>Add Friend</Button>

  </Card.Body>
</Card>
</div>


      );
  };
   

export default UserExplore;
    