import React, { useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserProviders";
import User from "./User";

export const UserList = () => {
  const { getAllUserProfiles,userProfiles } = useContext(UserContext);
  //state varible^^  we do this with info that will change like adding a post to post
  
  useEffect(() => {
    getAllUserProfiles()
    
  }, []);

//Todo: need to filter already followed friend   

  return (
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {userProfiles.map((singleUserInLoop) =>  (
       
            <User key={singleUserInLoop.id} UserProp={singleUserInLoop} />
          ))}
   
        </div>
      </div>
    </div>
  );
};