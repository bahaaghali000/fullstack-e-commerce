import { Container, Row } from "reactstrap";
import "../styles/admin-nav.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const admin__nav = [
  {
    display: "Dishboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
  {
    display: "Add-Product",
    path: "/dashboard/add-product",
  },
];

const AdminNav = ({ searchValue }) => {
  const { user } = useSelector((state) => state.auth);
  const [showProfileActions, setShowProfileActions] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    navigate("/dashboard/all-products");
    searchValue(e.target.value);
  };

  const handleClickOutSide = () => {
    setShowProfileActions(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleLogout = () => {
    window.open(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, "_self");
    dispatch(logout(undefined));
  };

  return (
    <div>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo" onClick={() => navigate("/home")}>
                <h2>Multimart</h2>
              </div>

              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search...."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              <div className="admin__nav-top-right">
                <motion.img
                  className="profile__picture"
                  whileTap={{ scale: 1.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileActions(!showProfileActions);
                  }}
                  src={user && user.profilePic}
                  alt="Profile Picture"
                />
                {showProfileActions && (
                  <div className="profile__actions">
                    <div className="d-flex flex-column align-items-center justify-content-center ">
                      <Link to="/home" className="text-dark">
                        Home
                      </Link>
                      <Link to="/profile" className="text-dark">
                        Profile
                      </Link>
                      <span onClick={handleLogout}>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list mb-0">
                {admin__nav.map((admin__nav, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={admin__nav.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {admin__nav.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AdminNav;
