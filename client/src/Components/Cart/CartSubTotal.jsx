import React from "react";
import { convertToCurrency } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartSubTotal = () => {
  const { totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between">
        <h5>Subtotal</h5>
        <h4>{convertToCurrency(totalAmount, "USD")}</h4>
      </div>
      <p>taxes and shipping will calculate in checkout</p>
      <button className="buy__btn" onClick={() => navigate("/checkout")}>
        Checkout
      </button>
      <button className="buy__btn mt-3" onClick={() => navigate("/shop")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CartSubTotal;
