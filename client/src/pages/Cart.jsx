import "../styles/cart.css";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import CartSkeleton from "../Components/skeletons/CartSkeleton";
import Skeleton from "react-loading-skeleton";
import CartTable from "../Components/Cart/CartTable";
import CartSubTotal from "../Components/Cart/CartSubTotal";

const Cart = () => {
  const { cartItems, loading, error } = useSelector((state) => state.cart);

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
                <CartTable />
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
                <CartSubTotal />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Cart;
