import React, { useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/forget-password`,
        {
          email,
        }
      );

      if (data.status == "success") {
        toast.success(data.message);
        navigate("/verify-code");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <Helmet title="Forgot-Passowrd">
      <section>
        <Container>
          <Row>
            <Col lg="7" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Forgot Password</h4>
              <Form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group p-0 mb-0">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <p className=" text-right">
                  We Will Send Verfication Code To Your Email
                </p>

                <button className="buy__btn auth__btn mb-3">Send</button>
                <p>
                  Back to login page
                  <Link to="/login"> login</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ForgotPassword;
