import { Container, Form, FormGroup, Col, Row } from "reactstrap";
import "../styles/profile.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { convertToBase64 } from "../utils";

const Profile = () => {
  const { currentUser } = useAuth();

  const [user, setUser] = useState();

  const profileLoadingRef = useRef();
  const profilePictureRef = useRef();

  const [enterName, setEnterName] = useState("");
  const [enterBio, setEnterBio] = useState("");
  const [enterPhoneNumber, setEnterPhoneNumber] = useState("");
  const [enterCity, setEnterCity] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(currentUser);
    if (user) {
      setEnterName(user.username);
      setEnterBio(user.bio);
      setEnterPhoneNumber(user.phoneNumber);
      setEnterCity(user.city);
    }
  }, [currentUser, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(
        `https://multimart-ecommerce-hr2c.onrender.com//api/user/${currentUser._id}`,
        {
          username: enterName || "",
          city: enterCity || "",
          phoneNumber: enterPhoneNumber || "",
          bio: enterBio || "",
        }
      );
      localStorage.setItem("multiUser", JSON.stringify(data.data));
      toast.success("Profile picture updated successfully");

      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error("Somethig Went Wrong");
    }
  };

  const handleProfilePic = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);

    const { data } = await axios.put(
      `https://multimart-ecommerce-hr2c.onrender.com//api/user/${currentUser._id}`,
      {
        profilePic: base64,
      }
    );

    localStorage.setItem("multiUser", JSON.stringify(data.data));
    toast.success("The Profile Updated successfully");
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };

  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      <section className="profile">
        <Container>
          {user ? (
            loading ? (
              <h5 className="text-center">Loading...</h5>
            ) : (
              <Row>
                <Col lg="4">
                  <div className="edit__img">
                    <div className="img__container ">
                      <span ref={profileLoadingRef}></span>
                      <img
                        src={user.profilePic}
                        ref={profilePictureRef}
                        alt="profile"
                      />
                    </div>
                    <p className="mt-3 mb-1 ">
                      {user.bio ? user.bio : "Edit Bio Field To show here"}
                    </p>
                    <input
                      type="file"
                      id="profile-picture"
                      accept="image/*"
                      onChange={handleProfilePic}
                    />
                    <label htmlFor="profile-picture" className="buy__btn mb-5">
                      Edit Photo
                    </label>
                  </div>
                </Col>

                <Col lg="8">
                  <h4 className="mb-4 fw-bold text-center">Edit Profile</h4>
                  <Form onSubmit={handleSubmit}>
                    <h6 className="mb-1 ms-1 text-danger">Your Id:</h6>
                    <FormGroup className="form__group">
                      <input type="text" value={user._id} disabled readOnly />
                    </FormGroup>

                    <h6 className="mb-1 ms-1 text-danger">Name:</h6>
                    <FormGroup className="form__group mb-4">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setEnterName(e.target.value)}
                        value={enterName}
                        required
                      />
                    </FormGroup>

                    <h6 className="mb-1 ms-1 text-danger">Bio:</h6>
                    <FormGroup className="form__group">
                      <input
                        type="text"
                        placeholder="bio"
                        onChange={(e) => setEnterBio(e.target.value)}
                        value={enterBio}
                      />
                    </FormGroup>

                    <h6 className="mb-1 ms-1 text-danger">Email Address:</h6>
                    <FormGroup className="form__group">
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        readOnly
                      />
                    </FormGroup>

                    <h6 className="mb-1 ms-1 text-danger">Phone Number:</h6>
                    <FormGroup className="form__group">
                      <input
                        type="tel"
                        placeholder="Phone number"
                        onChange={(e) => setEnterPhoneNumber(e.target.value)}
                        value={enterPhoneNumber}
                      />
                    </FormGroup>

                    <h6 className="mb-1 ms-1 text-danger">City:</h6>
                    <FormGroup className="form__group">
                      <input
                        type="text"
                        placeholder="City"
                        onChange={(e) => setEnterCity(e.target.value)}
                        value={enterCity}
                      />
                    </FormGroup>

                    <button type="submit" className="buy__btn">
                      Update Profile
                    </button>
                  </Form>
                </Col>
              </Row>
            )
          ) : (
            <h2 className="text-center">Loading....</h2>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;
