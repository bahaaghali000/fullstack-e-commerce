import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

const AdminNavProfile = () => {
  const [showProfileActions, setShowProfileActions] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, "_self");
    dispatch(logout(undefined));
  };

  const profilePicSrc = () => {
    if (user?.googleId) {
      return user.profilePic;
    } else return `${import.meta.env.VITE_BACKEND_URL}/${user.profilePic}`;
  };

  return (
    <div className="admin__nav-top-right">
      <motion.img
        className="profile__picture"
        whileTap={{ scale: 1.2 }}
        onClick={(e) => {
          e.stopPropagation();
          setShowProfileActions(!showProfileActions);
        }}
        src={profilePicSrc()}
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
  );
};

export default AdminNavProfile;
