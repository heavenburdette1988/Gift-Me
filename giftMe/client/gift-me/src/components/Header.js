import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/userDashboard" className="navbar-brand">
        Gift Me
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
        
      </ul>
    </nav>
  );
};

export default Header;