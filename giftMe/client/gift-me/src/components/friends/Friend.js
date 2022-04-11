import React, {useContext, useState  } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FriendContext } from "../../providers/FriendProvider";

 const Friend = ({ FriendProp }) => {


    const { deleteFriend, getAllFriendByUserProfile} = useContext(FriendContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   


const handleUnfriend = () => {
       
         deleteFriend(FriendProp.id)
             .then(getAllFriendByUserProfile)                        
            
            
             }

  return (

    <Card style={{ width: '18rem' }}>
    <Link to={`/user/${FriendProp.userProfiles[0].id}`}>
  <Card.Img variant="top"  src={FriendProp.userProfiles[0].imageLocation} />
  </Link>
  <Card.Body>
  <Link to={`/user/${FriendProp.userProfiles[0].id}`}>
    <Card.Title>{FriendProp.userProfiles[0].displayName}</Card.Title>
    </Link>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary" onClick={handleShow} >Unfriend</Button>
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


  );
};

export default Friend;
