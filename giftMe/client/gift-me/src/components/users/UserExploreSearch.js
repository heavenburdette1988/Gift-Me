
import React, { useContext, useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FriendContext } from "../../providers/FriendProvider";
import { UserContext } from "../../providers/UserProviders";


export const SearchBar = () => {
   
   
    const { searchUserExplore,getAllUserProfiles } = useContext(UserContext);
    const { getAllFriends} = useContext(FriendContext)

    const [ searchTerm, setSearchUsers ] = useState("");

    useEffect(() => {
      getAllUserProfiles().then(getAllFriends)
    }, [])


    const handleControlledInputChange = (props) => {
        const newSearchTerms= {...searchTerm }
        newSearchTerms[props.target.id] = props.target.value
        setSearchUsers(newSearchTerms)
      }
      const handleClickSearchEvent = (props) =>{
          props.preventDefault()
          searchUserExplore(searchTerm)
                }
 return (
    <>

    <input type="text"
      className="input--wide"
      id="search"
      placeholder="Search for a users... " onClick={handleControlledInputChange} value={searchTerm}/>
            <button id="saveEvent-button"className="btn btn-secondary"
              onClick={handleClickSearchEvent}>
               Search Users
            </button>
        </>
      )
  }
export default SearchBar;