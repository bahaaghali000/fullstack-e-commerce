import "./header.css";
import { useRef, useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

const nav__links = [
  {
    id: 1,
    path: "home",
    text: "Home",
  },
  {
    id: 2,
    path: "shop",
    text: "Shop",
  },
  {
    id: 3,
    path: "cart",
    text: "Cart",
  },
];

const Header = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { totalFav } = useSelector((state) => state.fav);

  const { currentUser, loading } = useAuth();

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionsRef = useRef(null);

  const navigate = useNavigate();

  const stickyHeaderFn = () => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFn();
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const toggleProfileActions = () => {
    profileActionsRef.current.classList.toggle("show__profile-actions");
  };

  useEffect(() => {
    return () => {
      profileActionsRef.current?.classList.remove("show__profile-actions");
    };
  });

  const logout = () => {
    localStorage.removeItem("multiUser");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <NavLink to="/">
                <img src={logo} alt="Logo" />
                <div>
                  <h1>Multimart</h1>
                  <p>Since 1995</p>
                </div>
              </NavLink>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu__links slide-left">
                {nav__links.map((link) => (
                  <li key={link.id} className="nav__item">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "nav_active" : ""
                      }
                    >
                      {link.text}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon" onClick={() => navigate("/favorite")}>
                <i className="ri-heart-line"></i>
                <span className="badge">{totalFav}</span>
              </span>

              <span className="cart__icon" onClick={() => navigate("/cart")}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  className="profile__picture"
                  onClick={toggleProfileActions}
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.profilePic : userIcon}
                  alt="user image"
                />
                <div className="profile__actions" ref={profileActionsRef}>
                  {currentUser ? (
                    <div className="d-flex flex-column align-items-center justify-content-center ">
                      <Link to="/dashboard" className="text-dark">
                        Dashboard
                      </Link>
                      <Link to="/profile" className="text-dark">
                        Profile
                      </Link>
                      <span onClick={logout}>Logout</span>
                    </div>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center ">
                      <Link to="/signup" className="text-dark">
                        Sign up
                      </Link>
                      <Link to="/login" className="text-dark">
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
