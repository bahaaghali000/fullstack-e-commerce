import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";
import useGetData from "../hooks/useGetData";

const Dashboard = () => {
  const { data: products } = useGetData(
    "https://multimart-ecommerce-hr2c.onrender.com/api/products/all-products"
  );
  const { data: users } = useGetData(
    "https://multimart-ecommerce-hr2c.onrender.com/api/user/all-users"
  );

  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
  });

  return (
    <section>
      <Container>
        <Row>
          <Col lg="3" md="6" sm="6" className=" mb-3">
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>${formatter.format(1232)}</span>
            </div>
          </Col>
          <Col lg="3" md="6" sm="6" className=" mb-3">
            <div className="order__box">
              <h5>Orders</h5>
              <span>345</span>
            </div>
          </Col>
          <Col lg="3" md="6" sm="6" className=" mb-3">
            <div className="products__box">
              <h5>Total Products</h5>
              <span>{formatter.format(products.length)}</span>
            </div>
          </Col>
          <Col lg="3" md="6" sm="6" className=" mb-3">
            <div className="users__box">
              <h5>Total Users</h5>
              <span>{users.length > 0 ? users.length : 0}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
