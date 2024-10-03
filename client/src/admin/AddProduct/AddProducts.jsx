import "../../styles/add-product.css";

import Helmet from "../../Components/Helmet/Helmet";
import AddProductForm from "./AddProductForm";
import { Col, Container, Row } from "reactstrap";

const AddProducts = () => {
  return (
    <Helmet title="Add Product">
      <section className="add__product">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-4">Add Product</h4>
              <AddProductForm />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AddProducts;
