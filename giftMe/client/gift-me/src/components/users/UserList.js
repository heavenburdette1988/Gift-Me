import React, { useContext, useEffect, useState } from "react";
import { FriendContext } from "../../providers/FriendProvider";
import { UserContext } from "../../providers/UserProviders";
import Friend from "../friends/Friend";
import UserExplore from "./UserExplore";
import User from "./UserExplore";

export const UserList = () => {
  const { getAllUserProfiles, userProfiles } = useContext(UserContext);

  const { Friends, getAllFriends } = useContext(FriendContext);

  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
  const myfriendList = Friends.filter(x => x.subscriberUserId === currentUser.id && x.endDateTime !== null)

  useEffect(() => {
    getAllUserProfiles().then(getAllFriends)

  }, []);
  // Filter in map to get user.id == to subscriber and emd datetime
  //Todo: need to filter already followed friend   

  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          <h1>Explore Friends</h1>
          {userProfiles.filter(x => myfriendList.some(y => y.profileUserId !== x.id) && x.id !== currentUser.id).map((singleUserInLoop) => (

            <UserExplore key={singleUserInLoop.id} UserProp={singleUserInLoop} />
          ))}



        </div>
      </div>
    </div>
  );
};