import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import useAddToCart from "../../hooks/useAddToCart";
import { cartActions } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAddOrRemoveToFav from "../../hooks/useAddOrRemoveToFav";
import { motion } from "framer-motion";
import { addItemToFav, deleteItemFromFav } from "../../redux/slices/favSlice";
import ProductRating from "./ProductRating";
import Model from "../UI/Model";
import ProductImage from "../UI/ProductImage";
import { convertToCurrency } from "../../utils";

const ProductInfo = ({ data }) => {
  const { product, isFavorite } = data;
  const [showModel, setShowModel] = useState(false);
  const { addToCart } = useAddToCart();
  const { addOrRemoveToFav } = useAddOrRemoveToFav();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProductToCart = async () => {
    if (isAuthenticated) {
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
    if (isAuthenticated) await addOrRemoveToFav(product._id);

    if (!isFavorite) {
      dispatch(
        addItemToFav({
          _id: product._id,
          productName: product.productName,
          price: product.price,
          imgUrl: product.imgUrl,
          category: product.category,
        })
      );
      if (!isAuthenticated)
        toast.success("Product added to favorites successfully");
    } else {
      dispatch(deleteItemFromFav(product._id));
      if (!isAuthenticated)
        toast.success("Product removed from favorites successfully");
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
          <ProductImage
            src={`${import.meta.env.VITE_BACKEND_URL}/${product.imgUrl}`}
            alt={product.productName}
          />
        </Col>

        <Col lg="6" md="6" sm="12">
          <div className="product__info">
            <h2>{product.productName}</h2>

            <ProductRating averageRating={product.averageRating} />

            <div className="d-flex align-items-center gap-5">
              <span className="product__price">
                {convertToCurrency(product.price, "USD")}
              </span>

              <span className="product__category">
                Category:{" "}
                <b>
                  {product?.category?.categoryName
                    ? product?.category?.categoryName
                    : "None"}
                </b>
              </span>

              <span className="fav" onClick={handleAddOrRemoveToFav}>
                <i
                  className={isFavorite ? "ri-heart-fill" : "ri-heart-line"}
                ></i>
              </span>
            </div>

            <div className="d-flex align-items-center gap-5 mt-4">
              <span>
                Quantity:{" "}
                <span className="fw-bold">
                  {product.quantity > 0 ? product.quantity : "Out of stock"}
                </span>
              </span>

              <span className="product__category">
                Views: <b>{product.views}</b>
              </span>
            </div>

            <p className="mt-3">{product.shortDesc}</p>
            <motion.button
              whileTap={{ scale: 1.5 }}
              className={`buy__btn mt-4 ${
                product.quantity <= 0 ? "btn__disabled" : ""
              } `}
              onClick={addProductToCart}
              disabled={product.quantity <= 0}
            >
              {product.quantity > 0 ? "Add to Cart" : "Out of stock"}
            </motion.button>
          </div>
        </Col>
      </Row>

      <Model
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        showModel={showModel}
        modalTitle="Alert"
        cancelBtnText="continue any way"
        sumbitBtnText="Log in"
      >
        You don't Logged in yet. your cart will gone after refresh the page. Log
        in to save your cart in our database
      </Model>
    </>
  );
};

export default ProductInfo;
