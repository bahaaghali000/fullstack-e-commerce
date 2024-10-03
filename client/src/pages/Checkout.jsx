import { Container, Row, Col } from "reactstrap";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../styles/checkout.css";
import BillingInformation from "../Components/Checkout/BillingInformation";
import CheckoutCart from "../Components/Checkout/CheckoutCart";

const Checkout = () => {
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />

      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <BillingInformation />
            </Col>

            <Col lg="4">
              <CheckoutCart />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
