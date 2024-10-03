import "./footer.css";
import { Container, Row, Col } from "reactstrap";
import TopCategories from "./TopCategories";
import UsefulLinks from "./UsefulLinks";
import Contact from "./Contact";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col lg="4" md="6" className="mb-4">
            <div className="logo">
              <div>
                <h1 className="text-white">Multimart</h1>
              </div>
            </div>
            <p className="footer__text mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              asperiores repellendus quaerat alias aspernatur eos voluptatum
              placeat sed facilis animi!
            </p>
          </Col>

          <Col lg="3" md="3" className="mb-4">
            <TopCategories />
          </Col>

          <Col lg="2" md="3" className="mb-4">
            <UsefulLinks />
          </Col>

          <Col lg="3" className="mb-4">
            <Contact />
          </Col>

          <Col lg="12">
            <p className="footer__copyright">
              Copyright {new Date().getFullYear()} developed by{" "}
              <a
                href={import.meta.env.VITE_BAHAA_PROTFOLIO_LINK}
                target="_blank"
              >
                Bahaa Ghali
              </a>
              . All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
