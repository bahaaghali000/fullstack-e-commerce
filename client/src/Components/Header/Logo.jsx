import React from "react";
import logo from "../../assets/images/eco-logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Logo" />
        <div>
          <h1>Multimart</h1>
          <p>Since 1995</p>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
