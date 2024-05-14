import "../styles/add-product.css";
import { useEffect, useState } from "react";
import { Col, Container, Row, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { convertToBase64 } from "../utils";
import useUpdateProduct from "../hooks/useUpdateProduct";

const EditProduct = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImage, setEnterProductImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const { loading: isLoading, editProduct } = useUpdateProduct();

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const product = {
      category: enterCategory,
      description: enterDescription,
      photoBase64:
        enterProductImage && (await convertToBase64(enterProductImage)),
      price: enterPrice,
      productName: enterTitle,
      shortDesc: enterShortDesc,
    };
    await editProduct(id, product);
  };

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setEnterTitle(data.data.productName);
        setEnterShortDesc(data.data.shortDesc);
        setEnterDescription(data.data.description);
        setEnterCategory(data.data.category);
        setEnterPrice(data.data.price);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  let loadingUI;

  if (isLoading) {
    loadingUI = (
      <div className="process__bar">
        <h5 className="text-center">Updating...</h5>
      </div>
    );
  } else if (loading) {
    loadingUI = (
      <div className="process__bar">
        <h5 className="text-center">Loading...</h5>
      </div>
    );
  }

  return (
    <section className="add__product">
      <Container>
        <Row>
          <Col lg="12">
            {loadingUI}
            {!isLoading && (
              <>
                <h4 className="mb-4">Edit Product</h4>
                <Form onSubmit={handleUpdateProduct}>
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

                  <div className="d-flex align-items-center justify-content-between gap-5">
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
                      onChange={(e) => setEnterProductImage(e.target.files[0])}
                    />
                  </FormGroup>
                  <button className="buy__btn">Update</button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditProduct;
