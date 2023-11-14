import { useEffect, useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import axios from "axios";

const Login = () => {
  const { currentUser, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "https://multimart-ecommerce-hr2c.onrender.com/api/user/login",
        {
          email,
          password,
        }
      );

      if (res.data.status === "fail") {
        setIsLoading(false);
        return toast.warning(res.data.msg);
      }
      setIsLoading(false);
      localStorage.setItem("multiUser", JSON.stringify(res.data.data));
      toast.success("Logged in successfully");
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (currentUser) {
        navigate("/home");
        toast.info("You already logged in");
      }
    }, 1000);
  }, [currentUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {isLoading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading......</h5>
              </Col>
            ) : (
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

                  <button className="buy__btn auth__btn mb-3">Login</button>
                  <p>
                    Don't have an account?
                    <Link to="/signup"> Create an account</Link>
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

export default Login;
