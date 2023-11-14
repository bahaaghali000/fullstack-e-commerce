import { Container, Row, Col } from "reactstrap";
import "./services.css";
import { motion } from "framer-motion";

import serviceData from "../../assets/data/serviceData";

const Services = () => {
  return (
    <section className="services">
      <Container>
        <Row>
          {serviceData.map((service, index) => (
            <Col lg="3" md="4" key={index}>
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
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
