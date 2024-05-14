import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const year = new Date().getFullYear();

  const { token } = useSelector((state) => state.auth);

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
            <div className="footer__quick-links">
              <h4 className="footer__quick-title">Top Categories</h4>
              <ListGroup className="mt-3">
                <ListGroupItem className="p-0 border-0 mb-3">
                  <Link to="#">Mobile Phones</Link>
                </ListGroupItem>

                <ListGroupItem className="p-0 border-0 mb-3">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className="p-0 border-0 mb-3">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>

                <ListGroupItem className="p-0 border-0 mb-3">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2" md="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="footer__quick-title">Useful Links</h4>
              <ListGroup className="mt-3">
                <ListGroupItem className="p-0 border-0 mb-3">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>

                <ListGroupItem className="p-0 border-0 mb-3">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="p-0 border-0 mb-3">
                  {token ? (
                    <Link to="/profile">Profile</Link>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </ListGroupItem>

                <ListGroupItem className="p-0 border-0 mb-3">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" className="mb-4">
            <div className="footer__quick-links">
              <h4 className="footer__quick-title">Contact</h4>
              <ListGroup className="mt-3 footer__contact">
                <ListGroupItem className="p-0 border-0 mb-2 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>Bani Mazar, Al Minya, Egypt</p>
                </ListGroupItem>

                <ListGroupItem className="p-0 border-0 mb-2 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>+201025265027</p>
                </ListGroupItem>

                <ListGroupItem className="p-0 border-0 mb-2 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>bahaaghali000@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer__copyright">
              Copyright {year} developed by <span>Bahaa Ghali</span>. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
