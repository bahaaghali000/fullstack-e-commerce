import { Container, Form, FormGroup, Col, Row } from "reactstrap";
import "../styles/profile.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { useEffect, useState } from "react";
import { convertToBase64 } from "../utils";
import { useSelector } from "react-redux";
import useUpdateProfile from "../hooks/useUpdateProfile";
import countryCodes from "../assets/data/CountryCodes.json";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [image, setImage] = useState();
  const { user } = useSelector((state) => state.auth);
  const [enterName, setEnterName] = useState("");
  const [enterBio, setEnterBio] = useState("");
  const [enterPhoneNumber, setEnterPhoneNumber] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [country, setCountry] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkUsernameFeedback, setCheckUsernameFeedback] = useState({
    status: "",
    message: "",
  });

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
      username: user.username === enterName ? undefined : enterName,
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

  const checkUsernameExsits = async (e) => {
    if (e.target.value.includes(" ")) {
      toast.warning("Username Shouldn't includes spaces");
      return;
    }

    setEnterName(e.target.value);

    if (e.target.value === user.username || !e.target.value.trim()) {
      setCheckUsernameFeedback({
        status: "",
        message: "",
      });
      return;
    }

    setCheckLoading(true);

    try {
      const { data } = await axios.post("/api/user/check", {
        username: e.target.value,
      });

      if (data.status == "success") {
        setCheckUsernameFeedback({
          status: "success",
          message: data.message,
        });
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.status === "fail") {
        setCheckUsernameFeedback({
          status: "fail",
          message: error?.response?.data?.message,
        });
      }
    } finally {
      setCheckLoading(false);
    }
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
                <FormGroup className="form__group mb-0">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    onChange={checkUsernameExsits}
                    value={enterName}
                    required
                  />
                </FormGroup>
                {checkUsernameFeedback.status === "success" ? (
                  <p
                    className="text-success fw-bold mx-1 "
                    style={{ fontSize: "0.8rem" }}
                  >
                    {checkUsernameFeedback.message}
                  </p>
                ) : (
                  <p
                    className="text-danger fw-bold mx-1 "
                    style={{ fontSize: "0.8rem" }}
                  >
                    {checkUsernameFeedback.message}
                  </p>
                )}

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
                      <option value="">Select Contery Code</option>
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
