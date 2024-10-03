import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToCurrency } from "../../utils";
import { cartActions } from "../../redux/slices/cartSlice";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";

const CartTable = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const { handleRemove } = useRemoveFromCart();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const hanleDelete = async (id) => {
    if (isAuthenticated) {
      await handleRemove(id);

      dispatch(cartActions.deleteItem(id));
    } else {
      dispatch(cartActions.deleteItem(id));
      toast.success("product is removed from cart successfully");
    }
  };

  return (
    <table className="table bordered mb-5">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Qty</th>
          <th className="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.product._id} className="table__content mb-3">
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  item.product.imgUrl
                }`}
                alt={item.productName}
              />
            </td>
            <td>{item.product.productName}</td>
            <td>{convertToCurrency(item.product.price, "USD")}</td>
            <td>{item.quantity}</td>
            <td className="text-center">
              <span>
                <i
                  onClick={() => hanleDelete(item.product._id)}
                  className="ri-delete-bin-line"
                ></i>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
