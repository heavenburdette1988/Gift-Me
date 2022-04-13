import React, {useContext, useEffect  } from "react";
// import { Card, CardImg, CardBody } from "reactstrap";

import {   Link, useNavigate,   } from "react-router-dom";

import { Button, Card,InputGroup,Modal } from 'react-bootstrap';
import { GiftContext } from "../../providers/GiftProvider";

import { Form,  } from "react-bootstrap";
import { UserContext } from "../../providers/UserProviders";
import './Event.css'

const Event = ({ eventProp }) => {

  const { getAllUserProfilesByDOB} = useContext(UserContext)
 
  

  useEffect(() => {
    getAllUserProfilesByDOB()
    }, []);
  

  return (
   
<Card style={{ width: '18rem' }}>
<Link to={`/user/${eventProp.id}`}>
<Card.Img variant="top" src={eventProp.imageLocation} alt={eventProp.displayName} />
</Link>
<Card.Body>
  <Card.Title><Link to={`/user/${eventProp.id}`}>{eventProp.displayName}</Link>'s Birthday </Card.Title>
  <Card.Text>{new Date(eventProp.dateOfBirth).toLocaleDateString('en-us',{ day: 'numeric', month: 'long' }
)} </Card.Text>

<a href="https://www.postable.com/cards?gclid=Cj0KCQjwxtSSBhDYARIsAEn0thTBQTku7mQNb7IHg30sQUWTym4ackWJIsqJQaAyvx13laxDRVKhDXMaAqdUEALw_wcB" target="_blank" rel="noreferrer">Send {eventProp.firstName} a card</a>
  </Card.Body>
      </Card>
     
  );
};

export default Event;