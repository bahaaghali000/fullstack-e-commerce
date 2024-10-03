import React from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import userIcon from "../../assets/images/user-icon.png";

const ProfilePicture = ({ handleProfilePicChange, image }) => {
  const { user } = useSelector((state) => state.auth);

  const profilePicSrc = () => {
    if (image) {
      return URL.createObjectURL(image);
    } else if (user?.googleId) {
      return user.profilePic;
    } else if (user?.profilePic) {
      return `${import.meta.env.VITE_BACKEND_URL}/${user.profilePic}`;
    } else {
      return userIcon;
    }
  };

  return (
    <div className="edit__img">
      <div className="img__container ">
        <img src={profilePicSrc()} alt="Profile Picture" />
      </div>
      <p className="mt-3 mb-1 ">
        {user.bio ? user.bio : "Edit Bio Field To show here"}
      </p>

      <input
        type="file"
        id="profile-picture"
        accept="image/*"
        onChange={handleProfilePicChange}
      />

      <Button className="mb-5">
        <label htmlFor="profile-picture">Edit Photo</label>
      </Button>
    </div>
  );
};

export default ProfilePicture;
