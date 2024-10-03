import React from "react";
import { Col, Container, Row } from "reactstrap";
import Clock from "../UI/Clock";
import { motion } from "framer-motion";
import counterImg from "../../assets/images/counter-timer-img.png";
import { Link } from "react-router-dom";

const TimerCount = () => {
  return (
    <section className="timer__count">
      <Container>
        <Row>
          <Col lg="6" md="12">
            <div className="clock__top-content">
              <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
              <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
            </div>

            <Clock />

            <motion.button
              whileTap={{ scale: 1.2 }}
              className="buy__btn store__btn"
            >
              <Link to="/shop">Visit Store</Link>
            </motion.button>
          </Col>
          <Col lg="6" md="6" className="text-end counter__img">
            <img src={counterImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TimerCount;
