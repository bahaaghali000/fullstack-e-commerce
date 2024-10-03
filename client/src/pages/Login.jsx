import { useEffect } from "react";
import "../styles/login.css";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col, Form } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../Validations/LoginSchema";
import ContinueWithGoogle from "../Components/UI/ContinueWithGoogle";
import FormInput from "../Components/UI/FormInput";

const Login = () => {
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const { login } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await login(data);
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="7" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Login</h4>
              <Form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  register={register("email")}
                  error={errors.email?.message}
                  placeholder="Enter your email"
                />

                <FormInput
                  register={register("password")}
                  error={errors.password?.message}
                  placeholder="Enter your password"
                  type="password"
                />

                <div className="forgot_password">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <ContinueWithGoogle text={"Sign in With Google"} />

                <button className="buy__btn auth__btn mb-3 mt-2 " type="submit">
                  Login
                </button>

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
