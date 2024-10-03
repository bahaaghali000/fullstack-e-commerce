import { useEffect } from "react";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col, Form } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useSignup from "../hooks/useSignup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../Validations/SignupSchema";
import ContinueWithGoogle from "../Components/UI/ContinueWithGoogle";
import FormInput from "../Components/UI/FormInput";

const Signup = () => {
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(SignupSchema),
  });

  const navigate = useNavigate();

  const { signup } = useSignup();

  const handleSignup = async (data) => {
    await signup(data);
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token]);

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Signup</h4>
              <Form
                className="auth__form"
                onSubmit={handleSubmit(handleSignup)}
              >
                <FormInput
                  register={register("username")}
                  error={errors.username?.message}
                  placeholder="Enter your username"
                />

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

                <ContinueWithGoogle text={"Continue With Google"} />

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
