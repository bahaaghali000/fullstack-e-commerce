import "../../styles/product-card.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import useAddToCart from "../../hooks/useAddToCart";
import { useState } from "react";
import Model from "../Model/Model";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showModel, setShowModel] = useState(false);

  const { loading, addToCart } = useAddToCart();

  const { token } = useSelector((state) => state.auth);

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
    <div className="product__card mt-2">
      <Link to={"/shop/" + product._id}>
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={product.imgUrl}
            alt="Product Image"
          />
        </div>

        <div className="p-2 product__info">
          <h3 className="product__name">{product.productName}</h3>
          <p>{product.category}</p>
        </div>
      </Link>
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

      <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
        <span className="price">${product.price}</span>
        <motion.span whileTap={{ scale: 1.2 }} onClick={addProductToCart}>
          <i className="ri-add-line"></i>
        </motion.span>
      </div>
    </div>
  );
};

export default ProductCard;
