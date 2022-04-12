import { Card } from "react-bootstrap";
import { UserContext } from "../../providers/UserProviders";
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";



import Event from "./Events";



const EventList = () => {
    
    const { getAllUserProfilesByDOB, userProfiles } = useContext(UserContext);
    const { getUserById } = useContext(UserContext);

    const [user, setUser] = useState({})

   

    const {userId} = useParams();



    useEffect(() => {
        console.log("useEffect", userId)
        getAllUserProfilesByDOB().then(() => getUserById(userId)
        )

            }, [])
   

   

      
        

    return (
<>
        {
            userProfiles.filter(up => up.userId !== userId).map(u => {
    
               
                   return (<Event key={u.id} eventProp={u} />)
           }
           )
}
    
      </>  
        


  
  
    );
  };

  export default EventList;