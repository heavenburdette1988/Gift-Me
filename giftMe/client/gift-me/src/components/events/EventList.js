import { Card } from "react-bootstrap";
import { UserContext } from "../../providers/UserProviders";
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";



import Event from "./Events";



const EventList = () => {
    
    const { getAllUserProfilesByDOB, userProfiles } = useContext(UserContext);
    




    useEffect(() => {
      
        getAllUserProfilesByDOB()
        

            }, [])
   

   

      
        

    return (
<>
<div><h2>Upcoming Birthdays</h2>
        {
            userProfiles.map(u => {
    
               
                   return (<Event key={u.id} eventProp={u} />)
           }
           )
}
</div>
      </>  
     
        


  
  
    );
  };

  export default EventList;