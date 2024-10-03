import { Container, Col, Row } from "reactstrap";
import "../styles/profile.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { useState } from "react";
import useUpdateProfile from "../hooks/useUpdateProfile";
import ProfilePicture from "../Components/Profile/ProfilePicture";
import ProfileForm from "../Components/Profile/ProfileForm";

const Profile = () => {
  const [image, setImage] = useState();

  const { loading, updateProfile } = useUpdateProfile();

  const handleProfilePicChange = async (e) => setImage(e.target.files[0]);

  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      <section className="profile">
        <Container>
          <Row>
            <Col lg="4">
              <ProfilePicture
                handleProfilePicChange={handleProfilePicChange}
                image={image}
              />
            </Col>

            <Col lg="8">
              <h4 className="mb-4 fw-bold text-center">Edit Profile</h4>
              <ProfileForm image={image} />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;
