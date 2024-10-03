import React, { useRef } from "react";
import { nav__links } from "../../constants/navLinks";
import Nav_Link from "./Nav_Link";

const NavLinks = () => {
  return (
    <ul className="menu__links slide-left">
      {nav__links.map((link) => (
        <Nav_Link key={link.id} link={link} />
      ))}
    </ul>
  );
};

export default NavLinks;
