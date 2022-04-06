import React, {useContext, useState,  } from "react";
// import { Card, CardImg, CardBody } from "reactstrap";

import {   useNavigate,   } from "react-router-dom";

import { Button, Card,Modal } from 'react-bootstrap';
import { GiftContext } from "../../providers/GiftProvider";


const Gift = ({ giftProp }) => {

  const {deleteGift} = useContext(GiftContext)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleGiftDelete = () => {
      console.log("deleteGiftId",giftProp.id)
   
    deleteGift(giftProp.id) 
        navigate(handleClose)            
  }
  

  return (
  
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={giftProp.imageLocation} alt={giftProp.title} />
<Card.Body>
  <Card.Title>Purchase for {giftProp.userProfile.displayName}: </Card.Title>
  <Card.Title><a href={giftProp.url} target="blank">{giftProp.title} </a></Card.Title>
   <Card.Text>
 <p> Notes: {giftProp.notes}</p>
 <p> Quantity Needed: {giftProp.quantity}</p>
  </Card.Text>

  <Button variant="primary">Edit</Button>
  <Button
    color="danger"
    outline
    onClick={handleShow}
  >
    Delete
  </Button>
</Card.Body>




      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {giftProp.title}?</Modal.Title>
        </Modal.Header>
        <Modal.Body><Card.Img variant="top" src={giftProp.imageLocation} alt={giftProp.title} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleGiftDelete}>
            Confirm Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </Card>

  );
};

export default Gift;