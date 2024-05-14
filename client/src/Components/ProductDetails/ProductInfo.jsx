import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import useAddToCart from "../../hooks/useAddToCart";
import { cartActions } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAddOrRemoveToFav from "../../hooks/useAddOrRemoveToFav";
import Model from "../Model/Model";
import { motion } from "framer-motion";
import { addItemToFav, deleteItemFromFav } from "../../redux/slices/favSlice";

const ProductInfo = ({ product, setFavorite, favorite }) => {
  const [showModel, setShowModel] = useState(false);
  const { addToCart } = useAddToCart();
  const { addOrRemoveToFav } = useAddOrRemoveToFav();

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProductToCart = async () => {
    if (token) {
      await addToCart(product._id);

      dispatch(
        cartActions.addItem({
          _id: product._id,
          productName: product.productName,
          imgUrl: product.imgUrl,
          price: product.price,
          category: product.category,
        })
      );
    } else {
      setShowModel(true);
    }
  };

  const handleAddOrRemoveToFav = async () => {
    if (token) {
      await addOrRemoveToFav(product._id);
    }
    if (!favorite) {
      dispatch(
        addItemToFav({
          _id: product._id,
          productName: product.productName,
          price: product.price,
          imgUrl: product.imgUrl,
          category: product.category,
        })
      );
      if (!token) toast.success("Product added to favorites successfully");
      setFavorite(true);
    } else {
      dispatch(deleteItemFromFav(product._id));
      if (!token) toast.success("Product removed from favorites successfully");
      setFavorite(false);
    }
  };

  const handleClose = () => {
    dispatch(
      cartActions.addItem({
        _id: product._id,
        productName: product.productName,
        imgUrl: product.imgUrl,
        price: product.price,
        category: product.category,
      })
    );
    toast.success("Product is added to cart successfully");
    setShowModel(false);
  };

  const handleSubmit = () => {
    navigate("/login");
    setShowModel(false);
  };
  return (
    <>
      <Row className=" justify-content-center ">
        <Col lg="6" md="6" sm="12" className="mt-2">
          <div className="product__image ">
            <img src={product.imgUrl} alt={product.productName} />
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
                <span style={{ color: "coral", fontWeight: "500" }}>{4.5}</span>
                ratings)
              </p>
            </div>

            <div className="d-flex align-items-center gap-5">
              <span className="product__price">${product.price}</span>
              <span className="product__category">
                Category: <b>{product.category}</b>
              </span>
              <span className="fav" onClick={handleAddOrRemoveToFav}>
                <i className={favorite ? "ri-heart-fill" : "ri-heart-line"}></i>
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
      {showModel && (
        <Model
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          showModel={showModel}
          modalTitle="Alert"
          modalDescription="You don't Logged in yet. your cart will gone after refresh the page. Log in to save your cart in our database"
          cancelBtn="continue any way"
          sumbitBtn="Log in"
        />
      )}
    </>
  );
};

export default ProductInfo;
