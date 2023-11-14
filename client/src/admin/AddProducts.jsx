import { useEffect, useState } from "react";
import { Col, Container, Row, Form, FormGroup } from "reactstrap";
import "../styles/add-product.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { convertToBase64 } from "../utils";
import { setProduct } from "../redux/slices/updateProduct";

const AddProducts = ({ mood }) => {
  const { prodcutToUpdate } = useSelector((state) => state.product);

  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImage, setEnterProductImage] = useState(null);
  const dispatch = useDispatch();
  const { currentUser, loading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // still working on it
  useEffect(() => {
    if (prodcutToUpdate) {
      setEnterTitle(prodcutToUpdate.productName);
      setEnterShortDesc(prodcutToUpdate.shortDesc);
      setEnterDescription(prodcutToUpdate.description);
      setEnterPrice(prodcutToUpdate.price);
      setEnterCategory(prodcutToUpdate.category);
    }

    return () => {
      dispatch(setProduct(""));
    };
  }, [prodcutToUpdate]);

  const addProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      headers: {
        Authorization: "Bearer " + currentUser.token,
      },
    };

    try {
      if (!loading) {
        if (!prodcutToUpdate) {
          await axios.post(
            "http://localhost:3000/api/products/create-product",
            {
              category: enterCategory,
              description: enterDescription,
              photoBase64: await convertToBase64(enterProductImage),
              price: enterPrice,
              productName: enterTitle,
              shortDesc: enterShortDesc,
            },
            config
          );
          toast.success("product uploaded successfully");
          navigate("/dashboard/all-products");
          setIsLoading(false);
        } else {
          console.log("this condition 2");
          await axios.put(
            `http://localhost:3000/api/products/${prodcutToUpdate._id}`,
            {
              category: enterCategory,
              description: enterDescription,
              photoBase64: enterProductImage
                ? await convertToBase64(enterProductImage)
                : null,
              price: enterPrice,
              productName: enterTitle,
              shortDesc: enterShortDesc,
            },
            config
          );
          toast.success("product updated successfully");
          navigate("/dashboard/all-products");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
      setIsLoading(false);
    }
  };

  console.log(prodcutToUpdate._id);

  return (
    <section className="add__product">
      <Container>
        <Row>
          <Col lg="12">
            {isLoading ? (
              <div className="process__bar">
                <h5 className="text-center">Uploading...</h5>
              </div>
            ) : (
              <>
                <h4 className="mb-4">Add Product</h4>
                <Form onSubmit={addProduct}>
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
                      required={prodcutToUpdate ? false : true}
                      onChange={(e) => setEnterProductImage(e.target.files[0])}
                    />
                  </FormGroup>
                  <button className="buy__btn">
                    {prodcutToUpdate ? "Edit" : "Add"} Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
