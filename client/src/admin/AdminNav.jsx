import { Container, Row } from "reactstrap";
import "../styles/admin-nav.css";
import useAuth from "../hooks/useAuth";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef } from "react";

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
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    navigate("/dashboard/all-products");
    searchValue(e.target.value);
  };
  const profileActionsRef = useRef(null);

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
    <>
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
                <img
                  className="profile__picture"
                  onClick={toggleProfileActions}
                  src={currentUser && currentUser.profilePic}
                  alt="Profile Picture"
                />
                <div className="profile__actions" ref={profileActionsRef}>
                  <div className="d-flex flex-column align-items-center justify-content-center ">
                    <Link to="/home" className="text-dark">
                      Home
                    </Link>
                    <Link to="/profile" className="text-dark">
                      Profile
                    </Link>
                    <span onClick={logout}>Logout</span>
                  </div>
                </div>
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
    </>
  );
};

export default AdminNav;
