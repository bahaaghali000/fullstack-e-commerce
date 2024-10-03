import Helmet from "../Components/Helmet/Helmet";
import { Col, Container, Form, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { RestPasswordSchema } from "../Validations/RestPasswordSchema";
import { useForm } from "react-hook-form";
import FormInput from "../Components/UI/FormInput";

const RestPassword = () => {
  const restToken = localStorage.getItem("multiRestToken");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(RestPasswordSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Loading...");
    try {
      const { data: dataBack } = await axios.patch(
        `/user/rest-password/${restToken}`,
        {
          password: data.password,
        }
      );

      if (dataBack.status === "success") {
        toast.success(dataBack.message);
        localStorage.removeItem("multiRestToken");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.dataBack);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <Helmet title="Rest Password">
      <section>
        <Container>
          <Row>
            <Col lg="7" className="m-auto text-center ">
              <h4 className="fw-bold mb-4">Rest Password</h4>
              <Form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                  register={register("password")}
                  error={errors.password?.message}
                  placeholder="Enter your new password"
                  type="password"
                />
                <FormInput
                  register={register("repassword")}
                  error={errors.repassword?.message}
                  placeholder="Repeat Password"
                  type="password"
                />

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
