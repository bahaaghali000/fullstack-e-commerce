import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { addItemToFav, deleteItemFromFav } from "../redux/slices/favSlice";
import { motion } from "framer-motion";
import "../styles/product-details.css";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import ProductsList from "../Components/UI/ProductsList";
import useGetData from "../hooks/useGetData";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tabs, setTabs] = useState(true);
  const [rating, setRating] = useState(null);
  const [reviewMsg, setReviewMsg] = useState("");
  const [favorite, setFavorite] = useState(true);
  const { id } = useParams();
  const [reviewName, setReviewName] = useState("");
  const { favItems } = useSelector((state) => state.fav);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const { data: products, loading } = useGetData(
    "https://multimart-ecommerce-hr2c.onrender.com/api/products/all-products"
  );

  const relatedProducts = products.filter(
    (pro) => pro.category === product.category && pro._id !== product._id
  );

  const reviewUser = useRef();

  useEffect(() => {
    axios
      .get(`https://multimart-ecommerce-hr2c.onrender.com/api/products/${id}`)
      .then((data) => setProduct(data.data.data));
  }, [id]);

  useEffect(() => {
    const item = favItems.filter((pro) =>
      pro.id === id ? setFavorite(false) : setFavorite(true)
    );
  }, [product]);

  const addProductToCart = () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        productName: product.productName,
        price: product.price,
        imgUrl: product.imgUrl,
      })
    );

    toast.success("Product Added To The Cart");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;

    if (!currentUser) {
      toast.info("You Should Log In First");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      const reviewObject = {
        userName: reviewUserName,
        text: reviewMsg,
        rating,
      };

      updateDoc(doc(db, "products", id), {
        reviews: [...product.reviews, reviewObject],
      })
        .then(() => {
          toast.success("Review Submitted");
          setRating(null);
          setReviewMsg("");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const addToFav = () => {
    if (favorite) {
      dispatch(
        addItemToFav({
          id,
          productName: product.productName,
          price: product.price,
          imgUrl: product.imgUrl,
        })
      );
    } else {
      dispatch(deleteItemFromFav(id));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={product.productName}>
      <CommonSection title={product.productName} />
      {loading ? (
        <h5 className="fw-bold text-center p-5">Loading....</h5>
      ) : (
        <>
          <div>
            <Container>
              <Row>
                <Col lg="6" md="6" sm="12">
                  <div className="product__image">
                    <img src={product.imgUrl} alt="product" />
                  </div>
                </Col>

                <Col lg="6" md="6" sm="12">
                  <div className="product__info">
                    <h2>{product.productName}</h2>
                    <div className="product__rating d-flex align-item-center gap-5 mb-3">
                      <div>
                        <span>
                          <i className="ri-star-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-half-line"></i>
                        </span>
                      </div>

                      <p>
                        (
                        <span style={{ color: "coral", fontWeight: "500" }}>
                          {4.5}
                        </span>
                        ratings)
                      </p>
                    </div>

                    <div className="d-flex align-items-center gap-5">
                      <span className="product__price">${product.price}</span>
                      <span className="product__category">
                        Category: {product.category}
                      </span>
                      <span className="fav" onClick={addToFav}>
                        <i
                          className={
                            favorite ? "ri-heart-line" : "ri-heart-fill"
                          }
                          onClick={() => setFavorite(!favorite)}
                        ></i>
                      </span>
                    </div>
                    <p className="mt-3">{product.shortDesc}</p>
                    <motion.button
                      whileTap={{ scale: 1.5 }}
                      className="buy__btn mt-4"
                      onClick={addProductToCart}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <section>
            <Container>
              <Row>
                <Col lg="12">
                  <div className="product__tabs">
                    <span
                      onClick={() => setTabs(true)}
                      className={tabs ? "active" : ""}
                    >
                      Description
                    </span>

                    <span
                      onClick={() => setTabs(false)}
                      className={!tabs ? "active" : ""}
                    >
                      Reviews (
                      {product.reviews?.length > 0 ? product.reviews.length : 0}
                      )
                    </span>
                  </div>
                  <p>
                    {tabs ? (
                      <p className="lh-md">{product.description}</p>
                    ) : (
                      <div className="product__review">
                        <div>
                          {product.reviews?.map((review, index) => (
                            <div className="review__tab mb-4" key={index}>
                              <h5 className="fs-6 mb-1 text-dark">
                                {review.userName}
                              </h5>
                              <p style={{ color: "coral" }} className="mb-1">
                                {review.rating} (rating)
                              </p>
                              <p>{review.text}</p>
                            </div>
                          ))}
                        </div>

                        <div className="review__form mt-5">
                          <form onSubmit={handleSubmit}>
                            <h4 className="text-dark">Leave your experience</h4>
                            <div className="form__group">
                              <input
                                type="text"
                                placeholder="Enter Your Name"
                                onChange={(e) => setReviewName(e.target.value)}
                                readOnly={currentUser ? true : false}
                                value={
                                  currentUser
                                    ? currentUser.displayName
                                    : reviewName
                                }
                                ref={reviewUser}
                              />
                            </div>

                            <div className="rating">
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(1)}
                              >
                                1
                                <i
                                  className={
                                    rating === 1
                                      ? "ri-star-fill active"
                                      : "ri-star-line"
                                  }
                                ></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(2)}
                              >
                                2
                                <i
                                  className={
                                    rating === 2
                                      ? "ri-star-fill active"
                                      : "ri-star-line"
                                  }
                                ></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(3)}
                              >
                                3
                                <i
                                  className={
                                    rating === 3
                                      ? "ri-star-fill active"
                                      : "ri-star-line"
                                  }
                                ></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(4)}
                              >
                                4
                                <i
                                  className={
                                    rating === 4
                                      ? "ri-star-fill active"
                                      : "ri-star-line"
                                  }
                                ></i>
                              </motion.span>
                              <motion.span
                                whileTap={{ scale: 1.2 }}
                                onClick={() => setRating(5)}
                              >
                                5
                                <i
                                  className={
                                    rating === 5
                                      ? "ri-star-fill active"
                                      : "ri-star-line"
                                  }
                                ></i>
                              </motion.span>
                            </div>

                            <div className="form__group">
                              <textarea
                                rows="4"
                                required
                                type="text"
                                onChange={(e) => setReviewMsg(e.target.value)}
                                placeholder="Review Message"
                                value={reviewMsg}
                              ></textarea>
                            </div>

                            <motion.button
                              whileTap={{ scale: 1.5 }}
                              className="buy__btn"
                            >
                              Submit
                            </motion.button>
                          </form>
                        </div>
                      </div>
                    )}
                  </p>
                </Col>

                <Col lg="12" className="mt-5">
                  <h2 className="related__title">You might also like</h2>
                </Col>

                <Row className=" align-items-end">
                  <ProductsList data={relatedProducts} />
                </Row>
              </Row>
            </Container>
          </section>
        </>
      )}
    </Helmet>
  );
};

export default ProductDetails;
