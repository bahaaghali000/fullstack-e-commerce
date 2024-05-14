import { Container, Form, FormGroup, Col, Row } from "reactstrap";
import "../styles/profile.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { useEffect, useRef, useState } from "react";
import { convertToBase64 } from "../utils";
import { useSelector } from "react-redux";
import useUpdateProfile from "../hooks/useUpdateProfile";
import countryCodes from "../assets/data/CountryCodes.json";
import axios from "axios";

const Profile = () => {
  const [image, setImage] = useState();
  const { user } = useSelector((state) => state.auth);
  const [enterName, setEnterName] = useState("");
  const [enterBio, setEnterBio] = useState("");
  const [enterPhoneNumber, setEnterPhoneNumber] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [country, setCountry] = useState("");

  const { loading, updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (user) {
      setEnterName(user.username);
      setEnterBio(user.bio);
      setEnterPhoneNumber(user.phoneNumber);
      setEnterCity(user.city);
    }
    axios
      .get(
        `https://ipinfo.io/json?token=${import.meta.env.VITE_IPINFO_TOKEN}`,
        {
          withCredentials: false,
        }
      )
      .then(({ data }) => {
        setCountry(data.country);
        if (user.googleId) setEnterCity(data.city);
      });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = {
      username: enterName || undefined,
      city: enterCity || undefined,
      phoneNumber: enterPhoneNumber || undefined,
      bio: enterBio || undefined,
      profilePic: image || undefined,
    };
    await updateProfile(profile);
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files?.[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      <section className="profile">
        <Container>
          <Row>
            <Col lg="4">
              <div className="edit__img">
                <div className="img__container ">
                  <img
                    src={image ? image : user.profilePic}
                    alt="Profile Picture"
                  />
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

                <h6 className="mb-1 ms-1 text-danger">Username:</h6>
                <FormGroup className="form__group mb-4">
                  <input
                    type="text"
                    placeholder="Enter your username"
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
                  <input type="email" value={user.email} disabled readOnly />
                </FormGroup>

                <h6 className="mb-1 ms-1 text-danger">Phone Number:</h6>
                {/* Add Contery code  */}
                <div className="d-flex gap-1 ">
                  <FormGroup className=" form__group w-25   flex-grow-1 ">
                    <select value={country} className="country__code w-100 ">
                      <option value="">Select Code</option>
                      {countryCodes.map((c) => (
                        <option value={c.code}>
                          {c.name} ({c.dial_code})
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                  <FormGroup className="form__group flex">
                    <input
                      type="tel"
                      placeholder="Phone number"
                      onChange={(e) => setEnterPhoneNumber(e.target.value)}
                      value={enterPhoneNumber}
                    />
                  </FormGroup>
                </div>

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
                <p className="mt-2 px-2 ">
                  We Get Your City and phone number code from your IP. Feel free
                  to update them if you using VPN
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;
