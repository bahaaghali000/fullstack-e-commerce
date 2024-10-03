import { Container, Row } from "reactstrap";
import "./services.css";
import serviceData from "../../constants/serviceData";
import Service from "./Service";

const Services = () => {
  return (
    <section className="services">
      <Container>
        <Row>
          {serviceData.map((service, index) => (
            <Service key={service.title + index} service={service} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
