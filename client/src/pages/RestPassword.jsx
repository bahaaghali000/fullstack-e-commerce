import React, { useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const RestPassword = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const restToken = localStorage.getItem("multiRestToken");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password < 8) {
      return toast.error("Password must be at least 8 characters");
    } else if (password !== repassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const { data } = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/user/rest-password/${restToken}`,
        {
          password,
        }
      );

      if (data.status === "success") {
        toast.success(data.message);
        localStorage.removeItem("multiRestToken");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
    }
  };

  return (
    <Helmet title="Rest Password">
      <section>
        <Container>
          <Row>
            <Col lg="7" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Rest Password</h4>
              <Form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group p-0">
                  <input
                    type="password"
                    required
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group p-0">
                  <input
                    type="password"
                    required
                    placeholder="Repeat Password"
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                </FormGroup>

                <button className="buy__btn auth__btn mb-3">Update</button>
                <p>
                  <Link to="/login"> Back to login page</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default RestPassword;
