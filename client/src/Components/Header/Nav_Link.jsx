import React from "react";
import { NavLink } from "react-router-dom";

const Nav_Link = ({ link }) => {
  return (
    <li className="nav__item">
      <NavLink
        to={link.path}
        className={({ isActive }) => (isActive ? "nav_active" : "")}
      >
        {link.text}
      </NavLink>
    </li>
  );
};

export default Nav_Link;
