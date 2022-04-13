import React, {useContext, useState, useEffect  } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FriendContext } from "../../providers/FriendProvider";
import { UserContext } from "../../providers/UserProviders";
import './Friend.css'
import '../users/User.css'

 const Friend = ({ FriendProp }) => {


    const { Friends,addFriend,deleteFriend, getAllFriendByUserProfile} = useContext(FriendContext)
    const {getUserById} = useContext(UserContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const {userId} = useParams();
    
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

 

    const [Friend, setFriend] = useState({
      profileUserId: FriendProp.profileUserId,
      subscriberUserId: +currentUser.id,
     
        })
    const navigate = useNavigate();

    useEffect(() => {
   
      if(userId){
      
       getUserById(userId)
 } }, [])

const handleUnfriend = () => {
                deleteFriend(FriendProp.id)
             .then(getAllFriendByUserProfile)
                        
             }

             const handleAddFriend = (event) => {
                          addFriend(Friend)
            .then(navigate("/userDashboard"));
              
     }

  return (
<div className="FriendCard">
    <Card style={{ width: '18rem' }}>
     
    <Link  to={`/user/${FriendProp.userProfiles[0].id}`}>
  <Card.Img variant="top"  src={FriendProp.userProfiles[0].imageLocation} />
  </Link> 
  <Card.Body>
  
  {currentUser.id === FriendProp.subscriberUserId ?
  <Link to={`/user/${FriendProp.userProfiles[0].id}`}>
    <Card.Title>{FriendProp.userProfiles[0].displayName}</Card.Title>
    </Link>: null}
    <Card.Text>
    {FriendProp.userProfiles[0].firstName}  {FriendProp.userProfiles[0].lastName}
    </Card.Text>
   
    {!userId ?
    <Button variant="primary" onClick={handleShow} >Unfriend</Button>
 : null}

{currentUser.id !== FriendProp.subscriberUserId ?
<Button variant="primary" onClick={handleAddFriend}>Add Friend</Button>
 : null}
  </Card.Body>

  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to unfriend {FriendProp.userProfiles[0].displayName}?</Modal.Title>
        </Modal.Header>
        <Modal.Body><Card.Img variant="top" src={FriendProp.userProfiles[0].imageLocation} alt={FriendProp.userProfiles[0].displayName} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUnfriend}>
            Confirm Unfriend
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Stay Friends
          </Button>
        </Modal.Footer>
      </Modal>
      
</Card>
</div>


  );
};
 

export default Friend;
