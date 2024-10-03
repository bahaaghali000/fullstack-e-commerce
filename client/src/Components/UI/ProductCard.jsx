import "../../styles/product-card.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import useAddToCart from "../../hooks/useAddToCart";
import { useState } from "react";
import Model from "./Model";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showModel, setShowModel] = useState(false);

  const { addToCart } = useAddToCart();

  const { isAuthenticated } = useSelector((state) => state.auth);

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
    <div className="product__card mt-2 overflow-hidden">
      <Link to={"/shop/" + product._id}>
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={`${import.meta.env.VITE_BACKEND_URL}/${product.imgUrl}`}
            alt={product.productName}
          />
        </div>

        <div className="p-2 product__info">
          <h3 className="truncate">{product.productName}</h3>
          {product?.category?.categoryName && (
            <p>{product?.category?.categoryName}</p>
          )}
        </div>
      </Link>

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
