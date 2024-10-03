import React from "react";
import { useNavigate } from "react-router-dom";
import { convertToCurrency } from "../../utils";
import { useSelector } from "react-redux";

const FavSubTotal = () => {
  const { totalAmount } = useSelector((state) => state.fav);

  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between">
        <h5>Subtotal</h5>
        <h4>{convertToCurrency(totalAmount, "USD")}</h4>
      </div>
      <p>Favorite Products</p>

      <button className="buy__btn mt-3" onClick={() => navigate("/shop")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default FavSubTotal;
