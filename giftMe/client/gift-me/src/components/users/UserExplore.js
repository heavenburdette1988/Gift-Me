import { useNavigate} from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import React, {useContext, useState,  useEffect  } from "react";
import { FriendContext } from "../../providers/FriendProvider";

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
    //   if(Friends.Filter(f => f.subscriberUserId !== user.id && f.endDateTime === null)){
    //     setUserProfile(userProfile)
     
    //   }
    // })
  
    }, []);

    const handleAddFriend = (event) => {
       
                    addFriend(Friend)
                  .then(navigate("/userDashboard"));
           }
          
          
 
  return (

    <Card style={{ width: '18rem' }}>
   
  <Card.Img variant="top" src={UserProp.imageLocation} />
  <Card.Body>
    <Card.Title>{UserProp.displayName}</Card.Title>
    <Card.Text>
     
    </Card.Text>
    <Button variant="primary" onClick={handleAddFriend}>Add Friend</Button>

  </Card.Body>
</Card>
 
      );
  };
   

export default UserExplore;
    