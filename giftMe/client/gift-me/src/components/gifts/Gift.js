import React, {useContext, useState,  } from "react";
// import { Card, CardImg, CardBody } from "reactstrap";

import {   useNavigate,   } from "react-router-dom";

import { Button, Card,InputGroup,Modal } from 'react-bootstrap';
import { GiftContext } from "../../providers/GiftProvider";

import { Form,  } from "react-bootstrap";

const Gift = ({ giftProp }) => {

  const {deleteGift, getAllGifts, patchGift} = useContext(GiftContext)
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleGiftDelete = () => {
      console.log("deleteGiftId",giftProp.id)
   
    deleteGift(giftProp.id) 
        navigate(handleClose)            
  }
  
  const handleReceived = () => {

  if (giftProp.itemReceived === true) {
    patchGift(giftProp.id, false)
           .then(getAllGifts) 
          } else {
            patchGift(giftProp.id, true)
            .then(getAllGifts) 
          }
          
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

  <Button variant="primary" onClick={() => navigate(`/gifts/edit/${giftProp.id}`)}>Edit</Button>
  <Button
    color="danger"
    outline
    onClick={handleShow}
  >
    Delete
  </Button>
</Card.Body>
<InputGroup className="mb-3">

            <Form.Check
           type="switch"
    id="itemReceived"
    onChange={handleReceived} required  className="form-control" />{giftProp.itemReceived === false ? <>Mark item when received</> : <>Mark item as not received</>}
 </InputGroup>  
  


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete {giftProp.title}?</Modal.Title>
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