import { useEffect, useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useLogin from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const { token } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      return toast.warning("Password must be at least 8 characters");
    }
    await login(email, password);
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  const signInWithGoogle = async () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="7" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Login</h4>
              <Form className="auth__form" onSubmit={handleSubmit}>
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
                <div className="forgot_password">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <FormGroup>
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="signup__google auth__btn"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                      alt="Google Icon"
                    />{" "}
                    Sign in With Google
                  </button>
                </FormGroup>
                <button className="buy__btn auth__btn mb-3 mt-2 ">Login</button>
                <p>
                  Don't have an account?
                  <Link to="/signup"> Create an account</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
