import { useState, useEffect } from "react";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useSignup from "../hooks/useSignup";
import { toast } from "react-toastify";

const Signup = () => {
  const { token } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { signup } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      return toast.warning("Password must be at least 8 characters");
    }

    await signup(username, email, password);
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token]);

  const signUpWithGoogle = async () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Signup</h4>
              <Form className="auth__form" onSubmit={handleSignup}>
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

                <FormGroup>
                  <button
                    type="button"
                    onClick={signUpWithGoogle}
                    className="signup__google auth__btn"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                      alt="Google Icon"
                    />{" "}
                    Continue With Google
                  </button>
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
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
