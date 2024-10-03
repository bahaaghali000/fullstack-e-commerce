import "../../styles/add-product.css";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../../Components/Helmet/Helmet";
import EditProductForm from "./EditProductForm";

const EditProduct = () => {
  const { id } = useParams();

  return (
    <Helmet title="Edit Product">
      <section className="add__product">
        <Container>
          <Row>
            <Col lg="12">
              <h4 className="mb-4">Edit Product</h4>
              <EditProductForm productId={id} />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default EditProduct;
