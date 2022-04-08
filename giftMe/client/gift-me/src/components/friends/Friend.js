import React from "react";

import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

 const Friend = ({ FriendProp }) => {
console.log(FriendProp)
console.log(FriendProp.userProfiles)

  return (

    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={FriendProp.userProfiles[0].imageLocation} />
  <Card.Body>
    <Card.Title>{FriendProp.userProfiles[0].displayName}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Unfriend</Button>
  </Card.Body>
</Card>
  );
};

export default Friend;
