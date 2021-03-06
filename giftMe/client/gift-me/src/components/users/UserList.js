import React, { useContext, useEffect } from "react";
import { FriendContext } from "../../providers/FriendProvider";
import { UserContext } from "../../providers/UserProviders";
import Friend from "../friends/Friend";
import UserExplore from "./UserExplore";
import User from "./UserExplore";
import './User.css'


export const UserList = () => {
  const { getAllUserProfiles, userProfiles } = useContext(UserContext);

  const { Friends, getAllFriends } = useContext(FriendContext);

  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))

  const myfriendList = Friends.filter(x => x.subscriberUserId === currentUser.id)

 

  useEffect(() => {
    getAllUserProfiles().then(getAllFriends)

  }, []);
  // Filter in map to get user.id == to subscriber and emd datetime
  //Todo: need to filter already followed friend   

  return (

    <div className="UserListContainer">
      
      <div className="row justify-content-center">
      <h1 className="Explore Title">Explore</h1>
      <div>
   
   
        <div className="cards-ExploreColumn">
       
          {userProfiles.filter(x => !myfriendList.some(y => y.profileUserId === x.id) && x.id !== currentUser.id).map((singleUserInLoop) => (

            <UserExplore key={singleUserInLoop.id} UserProp={singleUserInLoop} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};