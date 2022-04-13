import React, { useContext, useEffect } from "react";
import { FriendContext } from "../../providers/FriendProvider";
import { UserContext } from "../../providers/UserProviders";

import { useParams } from "react-router-dom";
import Friend from "../friends/Friend";
import './User.css'

export const UserFriend = () => {
  const { Friends, getAllFriends } = useContext(FriendContext);
const { getUserById } = useContext(UserContext)

  const {userId} = useParams();


  useEffect(() => {
      getUserById(userId).then(() => getAllFriends)
    
  }, []);



  return (
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-FriendColumn">
          <h2>Friends</h2>
          {Friends.filter(x => x.subscriberUserId === +userId).map((singleFriendInLoop) =>  (
      
            <Friend key={singleFriendInLoop.id} FriendProp={singleFriendInLoop} />
          ))}
   
        </div>
      </div>
    </div>
  );
};