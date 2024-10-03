import React from "react";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero-img.png";

const Hero = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <p className="hero__subtitle">
                Treanding product in {new Date().getFullYear()}
              </p>
              <h2>Make Your Interior More Minimalistic & Modern</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
                quo eaque placeat quae aliquid odio vitae numquam sunt facilis
                laboriosam.
              </p>
              <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                <Link to="/shop">SHOP NOW</Link>
              </motion.button>
            </div>
          </Col>
          <Col lg="6" md="6">
            <div className="hero__image">
              <img src={heroImage} alt="Hero" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
