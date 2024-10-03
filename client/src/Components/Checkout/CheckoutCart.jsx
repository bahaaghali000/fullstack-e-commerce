import React from "react";
import { convertToCurrency } from "../../utils";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckoutCart = () => {
  const { totalQuantity, totalAmount, cartItems } = useSelector(
    (state) => state.cart
  );

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        "/payment/create-checkout-session",
        cartItems
      );

      window.location = await data.url;
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="checkout__cart">
      <h6>
        Total Qty: <span>{totalQuantity} item</span>
      </h6>
      <h6>
        Subtotal: <span>{convertToCurrency(totalAmount, "USD")}</span>
      </h6>
      <h6>
        Shipping:
        <br />
        Free shipping<span>{convertToCurrency(0, "USD")}</span>
      </h6>

      <h4>
        Total Cost: <span>{convertToCurrency(totalAmount, "USD")}</span>
      </h4>

      <button className="buy__btn auth__btn w-100" onClick={handleCheckout}>
        Place an order
      </button>
    </div>
  );
};

export default CheckoutCart;
