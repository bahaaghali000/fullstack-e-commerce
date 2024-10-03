import React, { useEffect, useRef, useState } from "react";
import Helmet from "../Components/Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import "../styles/verify-code.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyCode = () => {
  const [values, setValues] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
  });

  const inputRefs = {
    value1Ref: useRef(null),
    value2Ref: useRef(null),
    value3Ref: useRef(null),
    value4Ref: useRef(null),
  };

  const resultRef = useRef(null);

  const navigate = useNavigate();

  const verify = async () => {
    try {
      const { data } = await axios.post(`/user/verify-code`, {
        verificationCode:
          values.value1 + values.value2 + values.value3 + values.value4,
      });

      if (data.status === "success") {
        toast.success(data.message);
        localStorage.setItem("multiRestToken", data.restPasswordToken);
        navigate("/rest-password");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      resultRef.current.innerHTML = "fill all inputs";
      setValues({
        value1: "",
        value2: "",
        value3: "",
        value4: "",
      });
      inputRefs.value1Ref.current.focus();
    }
  };

  useEffect(() => {
    if (values.value1 && values.value2 && values.value3 && values.value4) {
      // submit
      resultRef.current.innerHTML = "Verfiying...";
      verify();
    }
  }, [values]);

  const handleChange = (fieldName, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));

    // Automatically focus on the next input field if there's a value
    if (value.length === 1) {
      switch (fieldName) {
        case "value1":
          inputRefs.value2Ref.current.focus();
          break;
        case "value2":
          inputRefs.value3Ref.current.focus();
          break;
        case "value3":
          inputRefs.value4Ref.current.focus();
          break;
        default:
          break;
      }
    }
  };

  return (
    <Helmet title="Verfiy Code">
      <section className="verfiy">
        <Container>
          <Row>
            <Col lg="7" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Verification Code</h4>
              <div className="auth__form">
                <div>
                  <h4 className=" text-white mt-0">Please Check Your Email</h4>
                  <p>
                    Please enter the verification code in the email that was
                    sent
                  </p>
                </div>
                <div className="verify__form ">
                  <input
                    type="text"
                    className="verify__input"
                    maxLength={1}
                    autoFocus={
                      !values.value2 && !values.value3 && !values.value4
                    }
                    value={values.value1}
                    onChange={(e) => handleChange("value1", e.target.value)}
                    ref={inputRefs.value1Ref}
                  />
                  <input
                    type="text"
                    className="verify__input"
                    maxLength={1}
                    autoFocus={values.value1}
                    value={values.value2}
                    onChange={(e) => handleChange("value2", e.target.value)}
                    ref={inputRefs.value2Ref}
                  />
                  <input
                    type="text"
                    className="verify__input"
                    maxLength={1}
                    autoFocus={values.value2}
                    value={values.value3}
                    onChange={(e) => handleChange("value3", e.target.value)}
                    ref={inputRefs.value3Ref}
                  />
                  <input
                    type="text"
                    className="verify__input"
                    maxLength={1}
                    autoFocus={values.value3}
                    value={values.value4}
                    onChange={(e) => handleChange("value4", e.target.value)}
                    ref={inputRefs.value4Ref}
                  />
                </div>

                <h4
                  className=" fw-medium  text-white mt-5 mb-5 "
                  ref={resultRef}
                >
                  fill all inputs
                </h4>
                <Link to="/login" className=" ">
                  Back to login page
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default VerifyCode;
