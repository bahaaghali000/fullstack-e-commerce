import { Container, Row } from "reactstrap";
import "../styles/dashboard.css";
import Helmet from "../Components/Helmet/Helmet";
import Categories from "./Categories/Categories";
import { useQuery } from "react-query";
import axios from "axios";
import { convertToCurrency } from "../utils";
import DashboardCardBox from "../Components/UI/DashboardCardBox";

const fetchTotalProducts = async () => {
  const { data } = await axios.get(`/products`);

  return data.data.totalProducts;
};

const fetchTotalUsers = async () => {
  const { data } = await axios.get(`/user`);

  return data.data.totalUsers;
};

const Dashboard = () => {
  const { data: totalProducts, isLoading } = useQuery(
    ["total-products"],
    fetchTotalProducts
  );

  const { data: totalUsers, isLoading: usersIsLoading } = useQuery(
    ["total-users"],
    fetchTotalUsers
  );

  return (
    <Helmet title="Dashboard">
      <section>
        <Container>
          <Row>
            <DashboardCardBox
              className="revenue__box"
              title="Total Sales"
              value={convertToCurrency(1232, "USD")}
            />

            <DashboardCardBox
              className="order__box"
              title="Orders"
              value="345"
            />

            <DashboardCardBox
              className="products__box"
              title="Total Products"
              value={isLoading ? "Loading..." : totalProducts}
            />

            <DashboardCardBox
              className="users__box"
              title="Total Users"
              value={usersIsLoading ? "Loading..." : totalUsers}
            />
          </Row>
          <Categories />
        </Container>
      </section>
    </Helmet>
  );
};

export default Dashboard;
