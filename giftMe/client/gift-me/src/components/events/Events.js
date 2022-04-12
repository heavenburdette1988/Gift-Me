import React, {useContext, useEffect  } from "react";
// import { Card, CardImg, CardBody } from "reactstrap";

import {   useNavigate,   } from "react-router-dom";

import { Button, Card,InputGroup,Modal } from 'react-bootstrap';
import { GiftContext } from "../../providers/GiftProvider";

import { Form,  } from "react-bootstrap";
import { UserContext } from "../../providers/UserProviders";

const Event = ({ eventProp }) => {

  const { getAllUserProfilesByDOB} = useContext(UserContext)
  
  

  useEffect(() => {
    getAllUserProfilesByDOB()
    }, []);
  

  return (
  
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={eventProp.imageLocation} alt={eventProp.displayName} />
<Card.Body>
  <Card.Title>{eventProp.displayName}'s' Birthday {new Date(eventProp.dateOfBirth).toLocaleDateString('en-us')} </Card.Title>
  
  </Card.Body>
      </Card>

  );
};

export default Event;