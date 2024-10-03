import React from "react";
import { admin__nav } from "../../constants/adminNavLinks";
import AdminNavLink from "./AdminNavLink";

const AdminNavLinks = () => {
  return (
    <ul className="admin__menu-list mb-0">
      {admin__nav.map((admin__nav, index) => (
        <AdminNavLink admin={admin__nav} key={admin__nav.display + index} />
      ))}
    </ul>
  );
};

export default AdminNavLinks;
