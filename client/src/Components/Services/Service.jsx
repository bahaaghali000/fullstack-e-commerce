import React from "react";
import { Col } from "reactstrap";
import { motion } from "framer-motion";

const Service = ({ service }) => {
  return (
    <Col lg="3" md="4">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="service__item"
        style={{ background: service.bg }}
      >
        <span>
          <i className={service.icon}></i>
        </span>
        <div>
          <h3>{service.title}</h3>
          <p>{service.subtitle}</p>
        </div>
      </motion.div>
    </Col>
  );
};

export default Service;
