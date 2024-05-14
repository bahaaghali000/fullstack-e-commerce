import "../styles/cart.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteItemFromFav } from "../redux/slices/favSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useAddOrRemoveToFav from "../hooks/useAddOrRemoveToFav";
import CartSkeleton from "../Components/skeletons/CartSkeleton";
import Skeleton from "react-loading-skeleton";

const Favorite = () => {
  const { favItems, totalAmount, loading } = useSelector((state) => state.fav);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { addOrRemoveToFav } = useAddOrRemoveToFav();

  const hanleDelete = async (id) => {
    if (token) {
      await addOrRemoveToFav(id);
    }
    dispatch(deleteItemFromFav(id));
  };

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
  });


  return (
    <Helmet title="Favorite Products">
      <CommonSection title="Favorite Products" />

      <section>
        <Container>
          <Row>
            <Col lg="9">
              {loading &&
                [...Array(10)].map((_, idx) => <CartSkeleton key={idx} />)}
              {favItems.length > 0 ? (
                <>
                  <table className="table bordered mb-5">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th className="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {favItems.map((item) => (
                        <tr key={item._id} className="table__content mb-3">
                          <td>
                            <img src={item.imgUrl} alt="" />
                          </td>
                          <td>{item.productName}</td>
                          <td>${item.price}</td>
                          <td className="text-center">
                            <span>
                              <i
                                onClick={() => hanleDelete(item._id)}
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
                <h4 className="text-center mt-5">No item added</h4>
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
                  <p>Favorite Products</p>

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

export default Favorite;
