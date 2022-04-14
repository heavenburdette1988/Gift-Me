

import React, {  useContext } from 'react';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProviders";

const Header = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  
  return (


    <nav className="navbar navbar-expand navbar-dark bg-info">
      {isLoggedIn &&
      <>
      <Link to="/userDashboard" className="navbar-brand">
        Gift Share
      </Link>
      <ul className="navbar-nav mr-auto">
      <li className="nav-item">
          <Link to="/userDashboard" className="nav-link">
       Home
          </Link>
        </li>
 
        <li className="nav-item">
          <Link to="users" className="nav-link">
            Explore
          </Link>
        </li>
        <li className="nav-item">
          <Link to={logout} onClick={logout} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
      
      </>
}

    </nav>

  );
};

export default Header;