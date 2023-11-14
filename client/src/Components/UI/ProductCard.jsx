import "../../styles/product-card.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(
      cartActions.addItem({
        id: product._id,
        productName: product.productName,
        price: product.price,
        imgUrl: product.imgUrl,
        category: product.category,
      })
    );

    toast.success("Product added To The Cart");
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
