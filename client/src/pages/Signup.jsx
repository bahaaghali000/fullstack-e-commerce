import { useState, useEffect } from "react";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";

import "../styles/login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import axios from "axios";

const Signup = () => {
  // const auth = getAuth();
  const { currentUser, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data } = await axios.post(
      "https://multimart-ecommerce-hr2c.onrender.com/api/user/regesiter",
      {
        username,
        email,
        password,
      }
    );
    localStorage.setItem(
      "multiUser",
      JSON.stringify({ ...data.data, token: data.token })
    );
    setIsLoading(false);
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {isLoading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading......</h5>
              </Col>
            ) : (
              <Col lg="8" className="m-auto text-center ">
                <h4 className="fw-bold mb-4">Signup</h4>
                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group p-0">
                    <input
                      type="text"
                      required
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group p-0">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form__group p-0">
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <button className="buy__btn auth__btn mb-3">
                    Create an Account
                  </button>
                  <p>
                    Already have an account?
                    <Link to="/login"> Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
