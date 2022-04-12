import React, {useContext, useEffect  } from "react";
// import { Card, CardImg, CardBody } from "reactstrap";

import {   useNavigate,   } from "react-router-dom";

import { Button, Card,InputGroup,Modal } from 'react-bootstrap';
import { GiftContext } from "../../providers/GiftProvider";

import { Form,  } from "react-bootstrap";
import { UserContext, UserProvider } from "../../providers/UserProviders";

const Event = ({ eventProp }) => {

  const {userProfiles, getAllUserProfilesByDOB} = useContext(UserContext)
  
  

  useEffect(() => {
    getAllUserProfilesByDOB()
    }, []);
  

  return (
  
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={eventProp.imageLocation} alt={eventProp.displayName} />
<Card.Body>
  <Card.Title>Birthday- {eventProp.DateOfBirth}: </Card.Title>
  {/* <Card.Title><a href={giftProp.url} target="blank">{giftProp.title} </a></Card.Title>
   <Card.Text>
 <p> Notes: {giftProp.notes}</p>
 <p> Quantity Needed: {giftProp.quantity}</p> */}
  {/* </Card.Text> */}
  </Card.Body>
      </Card>

  );
};

export default Event;