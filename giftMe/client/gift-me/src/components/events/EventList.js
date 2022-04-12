import { Card } from "react-bootstrap";
import { UserContext } from "../../providers/UserProviders";
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";



import Event from "./Events";
import { FriendContext } from "../../providers/FriendProvider";



const EventList = () => {
    
    const { getAllUserProfilesByDOB, userProfiles } = useContext(UserContext);
    
    const { Friends, getAllFriends } = useContext(FriendContext);
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))


    const myfriendList = Friends.filter(x => x.subscriberUserId === currentUser.id)

  
    useEffect(() => {
      
        getAllUserProfilesByDOB().then(getAllFriends)
        

            }, [])
   

   

      
        

    return (
<>
<div><h2>Upcoming Birthdays</h2>
        {
            userProfiles.filter(x => myfriendList.some(y => y.profileUserId === x.id) && x.id !== currentUser.id).map(u => {
    
               
                   return (<Event key={u.id} eventProp={u} />)
           }
           )
}
</div>
      </>  
     
        


  
  
    );
  };

  export default EventList;