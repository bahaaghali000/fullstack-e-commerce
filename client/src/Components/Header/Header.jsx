import "./header.css";
import { useRef, useEffect } from "react";
import { Container } from "reactstrap";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import HeaderActions from "./HeaderActions";
import HeaderProfile from "./HeaderProfile";

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper">
          <Logo />

          <div className="navigation" ref={menuRef} onClick={menuToggle}>
            <NavLinks />
          </div>

          <div className="nav__icons">
            <HeaderActions />

            <HeaderProfile />

            <span onClick={menuToggle} className="mobile__menu">
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
