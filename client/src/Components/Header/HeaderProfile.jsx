import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userIcon from "../../assets/images/user-icon.png";

const HeaderProfile = () => {
  const [showProfileActions, setShowProfileActions] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, "_self");
    dispatch(logout(undefined));
  };

  const handleClickOutSide = useCallback(() => {
    setShowProfileActions(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const profilePicSrc = () => {
    if (isAuthenticated) {
      if (user?.googleId) {
        return user.profilePic;
      } else return `${import.meta.env.VITE_BACKEND_URL}/${user.profilePic}`;
    } else {
      return userIcon;
    }
  };

  return (
    <div className="profile">
      <motion.img
        className="profile__picture "
        onClick={(e) => {
          e.stopPropagation();
          setShowProfileActions(!showProfileActions);
        }}
        whileTap={{ scale: 1.2 }}
        src={profilePicSrc()}
        alt="Profile Picture"
      />

      {showProfileActions && (
        <div className="profile__actions">
          {isAuthenticated && (
            <div className="d-flex flex-column align-items-center justify-content-center ">
              {user.role === "admin" && (
                <Link to="/dashboard" className="text-dark">
                  Dashboard
                </Link>
              )}

              <Link to="/profile" className="text-dark">
                Profile
              </Link>
              <span onClick={handleLogout}>Logout</span>
            </div>
          )}

          {!isAuthenticated && (
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
  );
};

export default HeaderProfile;
