import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand">
        Gift Me
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Explore
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/posts/add" className="nav-link">
          User Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;