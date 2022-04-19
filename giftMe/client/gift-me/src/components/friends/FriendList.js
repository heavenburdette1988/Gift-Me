import React, { useContext, useEffect } from "react";
import { FriendContext } from "../../providers/FriendProvider";
import Friend from "./Friend";
import './Friend.css'


export const FriendList = () => {
  const { Friends, getAllFriends } = useContext(FriendContext);
  //state varible^^  we do this with info that will change like adding a post to post
  
  useEffect(() => {
  
    debugger
    getAllFriends();
  }, []);

  const user = JSON.parse(sessionStorage.getItem("userProfile"))

  return (
    
    <div className="FriendList">
      <div className="row justify-content-center">
        <div className="cards-column">
          <h2 className="friendTitle">Friends</h2>
          {Friends.filter(x => x.subscriberUserId === user.id).map((singleFriendInLoop) =>  (
       
            <Friend key={singleFriendInLoop.id} FriendProp={singleFriendInLoop} />
          ))}
   
        </div>
      </div>
    </div>
  );
};

