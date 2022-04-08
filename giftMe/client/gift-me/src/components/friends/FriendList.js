import React, { useContext, useEffect } from "react";
import { FriendContext } from "../../providers/FriendProvider";
import Friend from "./Friend";

export const FriendList = () => {
  const { Friends, getAllFriendByUserProfile } = useContext(FriendContext);
  //state varible^^  we do this with info that will change like adding a post to post
  
  useEffect(() => {
  
    
    getAllFriendByUserProfile();
  }, []);

  const user = JSON.parse(sessionStorage.getItem("userProfile"))
console.log(Friends,"friend")
  return (
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {Friends.filter(f => f.subscriberUserId === user.id).map((singleFriendInLoop) =>  (
       
            <Friend key={singleFriendInLoop.id} FriendProp={singleFriendInLoop} />
          ))}
   
        </div>
      </div>
    </div>
  );
};

