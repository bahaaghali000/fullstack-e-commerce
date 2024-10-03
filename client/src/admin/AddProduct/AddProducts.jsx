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
              {/* {loading ? (
                <div className="process__bar">
                  <h5 className="text-center">Uploading...</h5>
                </div>
              ) : (
                <>
                  <h4 className="mb-4">Add Product</h4>
                  <AddProductForm />
                </>
              )} */}
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
{
  /* <option value="">Select Category</option>
                            <option value="sofa">Sofa</option>
                            <option value="mobile">Mobile</option>
                            <option value="chair">Chair</option>
                            <option value="watch">Watch</option>
                            <option value="wireless">Wireless</option> */
}
