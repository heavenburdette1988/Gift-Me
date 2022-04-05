// import React from "react";
// import { Card, CardImg, CardBody } from "reactstrap";

import {   useNavigate   } from "react-router-dom";

import { Button, Card } from 'react-bootstrap';

const Gift = ({ giftProp }) => {

  
  const navigate = useNavigate();
  

  return (
  
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={giftProp.imageLocation} alt={giftProp.title} />
<Card.Body>
  <Card.Title>Buy for {giftProp.userProfile.displayName}: <a href={giftProp.url} target="blank">{giftProp.title} </a></Card.Title>
   <Card.Text>
 <p> Notes: {giftProp.notes}</p>
 <p> Quantity Needed: {giftProp.quantity}</p>
  </Card.Text>

  <Button variant="primary">Edit</Button>
  <Button variant="primary">Delete</Button>
</Card.Body>
</Card>
  );
};

export default Gift;