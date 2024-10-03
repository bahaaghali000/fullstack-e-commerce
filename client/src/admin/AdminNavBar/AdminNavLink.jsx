import React from "react";
import { NavLink } from "react-router-dom";

const AdminNavLink = ({ admin }) => {
  return (
    <li className="admin__menu-item">
      <NavLink
        to={admin.path}
        className={({ isActive }) => (isActive ? "active__admin-menu" : "")}
      >
        {admin.display}
      </NavLink>
    </li>
  );
};

export default AdminNavLink;
