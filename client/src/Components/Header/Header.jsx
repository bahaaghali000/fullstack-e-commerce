import "./header.css";
import { useRef, useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

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
  const { user, token } = useSelector((state) => state.auth);

  const [showProfileActions, setShowProfileActions] = useState(false);

  const dispatch = useDispatch();

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  const handleClickOutSide = () => {
    setShowProfileActions(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const handleLogout = () => {
    window.open("http://localhost:3000/auth/logout", "_self");
    dispatch(logout(undefined));
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileActions(!showProfileActions);
                  }}
                  whileTap={{ scale: 1.2 }}
                  src={token ? user.profilePic : userIcon}
                  alt="Profile Picture"
                />
                {showProfileActions && (
                  <div className="profile__actions">
                    {token ? (
                      <div className="d-flex flex-column align-items-center justify-content-center ">
                        <Link to="/dashboard" className="text-dark">
                          Dashboard
                        </Link>
                        <Link to="/profile" className="text-dark">
                          Profile
                        </Link>
                        <span onClick={handleLogout}>Logout</span>
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
                )}
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
