import { useState } from "react";
import { Col, Container, Row, Form, FormGroup } from "reactstrap";
import "../styles/add-product.css";
import { convertToBase64 } from "../utils";
import useAddProduct from "../hooks/useAddProduct";
import Helmet from "../Components/Helmet/Helmet";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState();
  const [enterProductImage, setEnterProductImage] = useState(null);

  const { loading, addProduct } = useAddProduct();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const product = {
      category: enterCategory,
      description: enterDescription,
      photoBase64: await convertToBase64(enterProductImage),
      price: +enterPrice,
      productName: enterTitle,
      shortDesc: enterShortDesc,
    };
    await addProduct(product);
  };

  return (
    <Helmet title="Add Product">
      <section className="add__product">
        <Container>
          <Row>
            <Col lg="12">
              {loading ? (
                <div className="process__bar">
                  <h5 className="text-center">Uploading...</h5>
                </div>
              ) : (
                <>
                  <h4 className="mb-4">Add Product</h4>
                  <Form onSubmit={handleAddProduct}>
                    <span className="text-danger">Product Title</span>
                    <FormGroup className="form__group">
                      <input
                        type="text"
                        placeholder="Double Sofa"
                        required
                        value={enterTitle}
                        onChange={(e) => setEnterTitle(e.target.value)}
                      />
                    </FormGroup>

                    <span className="text-danger">Short Description</span>
                    <FormGroup className="form__group">
                      <input
                        type="text"
                        placeholder="lorem...."
                        required
                        value={enterShortDesc}
                        onChange={(e) => setEnterShortDesc(e.target.value)}
                      />
                    </FormGroup>

                    <span className="text-danger">Description</span>
                    <FormGroup className="form__group">
                      <input
                        type="text"
                        placeholder="Description...."
                        required
                        value={enterDescription}
                        onChange={(e) => setEnterDescription(e.target.value)}
                      />
                    </FormGroup>

                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="w-50">
                        <span className="text-danger">Price</span>
                        <FormGroup className="form__group">
                          <input
                            type="number"
                            placeholder="$100"
                            required
                            value={enterPrice}
                            onChange={(e) => setEnterPrice(e.target.value)}
                          />
                        </FormGroup>
                      </div>

                      <div className="w-50">
                        <span className="text-danger">Category</span>
                        <FormGroup className="form__group p-2">
                          <select
                            className="w-100"
                            value={enterCategory}
                            required
                            onChange={(e) => setEnterCategory(e.target.value)}
                          >
                            <option value="">Select Category</option>
                            <option value="sofa">Sofa</option>
                            <option value="mobile">Mobile</option>
                            <option value="chair">Chair</option>
                            <option value="watch">Watch</option>
                            <option value="wireless">Wireless</option>
                          </select>
                        </FormGroup>
                      </div>
                    </div>
                    <span className="text-danger">Product Image</span>
                    <FormGroup className="form__group">
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) =>
                          setEnterProductImage(e.target.files[0])
                        }
                      />
                    </FormGroup>
                    <button className="buy__btn">Add Product</button>
                  </Form>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AddProducts;
