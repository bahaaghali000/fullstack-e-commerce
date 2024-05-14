import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";
import useGetUsers from "../hooks/useGetUsers";
import useFilterProducts from "../hooks/useFilterProducts";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const { fetchUsers } = useGetUsers();
  const { fetchProducts } = useFilterProducts();

  useEffect(() => {
    fetchUsers("").then((data) => setTotalUsers(data.length));
    fetchProducts("", "").then((data) => setTotalProducts(data.length));
  }, []);

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
              <span>{totalProducts}</span>
            </div>
          </Col>
          <Col lg="3" md="6" sm="6" className=" mb-3">
            <div className="users__box">
              <h5>Total Users</h5>
              <span>{totalUsers}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
