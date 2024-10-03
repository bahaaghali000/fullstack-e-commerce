import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeaderActions = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { totalFav } = useSelector((state) => state.fav);

  const navigate = useNavigate();

  return (
    <>
      <span className="fav__icon" onClick={() => navigate("/favorite")}>
        <i className="ri-heart-line"></i>
        <span className="badge">{totalFav}</span>
      </span>

      <span className="cart__icon" onClick={() => navigate("/cart")}>
        <i className="ri-shopping-bag-line"></i>
        <span className="badge">{totalQuantity}</span>
      </span>
    </>
  );
};

export default HeaderActions;
