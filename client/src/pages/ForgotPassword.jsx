import React, { useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import "../styles/login.css";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema } from "../Validations/ForgotPasswordSchema";
import FormInput from "../Components/UI/FormInput";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Loading...");

    try {
      const { data: dataBack } = await axios.post(
        `/user/forget-password`,
        data
      );

      if (dataBack.status == "success") {
        toast.success(dataBack.message);
        navigate("/verify-code");
      }
    } catch (error) {
      toast.error(error?.response?.dataBack?.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <Helmet title="Forgot-Passowrd">
      <section>
        <Container>
          <Row>
            <Col lg="7" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Forgot Password</h4>
              <Form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  register={register("email")}
                  error={errors.email?.message}
                  placeholder="Enter your email"
                />
                <p className="text-start">
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
