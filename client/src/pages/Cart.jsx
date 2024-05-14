import "../styles/cart.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import useRemoveFromCart from "../hooks/useRemoveFromCart";
import { toast } from "react-toastify";
import CartSkeleton from "../Components/skeletons/CartSkeleton";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

const Cart = () => {
  const { cartItems, totalAmount, loading, error } = useSelector(
    (state) => state.cart
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleRemove } = useRemoveFromCart();

  const hanleDelete = async (id) => {
    if (token) {
      await handleRemove(id);

      dispatch(cartActions.deleteItem(id));
    } else {
      dispatch(cartActions.deleteItem(id));
      toast.success("product is removed from cart successfully");
    }
  };

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
  });

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <section>
        <Container>
          <Row>
            <Col lg="9">
              {loading &&
                [...Array(10)].map((_, idx) => <CartSkeleton key={idx} />)}
              {error && <h4 className="text-center mt-5">{error}</h4>}
              {cartItems.length > 0 ? (
                <>
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
                        <tr
                          key={item.product._id}
                          className="table__content mb-3"
                        >
                          <td>
                            <img src={item.product.imgUrl} alt="" />
                          </td>
                          <td>{item.product.productName}</td>
                          <td>${item.product.price}</td>
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
                </>
              ) : (
                <h4 className="text-center mt-5">No item added to the cart</h4>
              )}
            </Col>

            <Col lg="3">
              {loading ? (
                <div>
                  <div className=" d-flex justify-content-between  align-items-center ">
                    <Skeleton width={100} />
                    <Skeleton width={60} />
                  </div>
                  <Skeleton height={30} className=" w-100 mt-2 mb-4" />
                  <Skeleton height={40} className="w-100 mb-1" />
                  <Skeleton height={40} className="w-100" />
                </div>
              ) : (
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5>Subtotal</h5>
                    <h4>${formatter.format(totalAmount)}</h4>
                  </div>
                  <p>taxes and shipping will calculate in checkout</p>
                  <button
                    className="buy__btn"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                  <button
                    className="buy__btn mt-3"
                    onClick={() => navigate("/shop")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
