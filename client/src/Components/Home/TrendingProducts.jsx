import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Col, Container, Row } from "reactstrap";
import ProductsList from "../UI/ProductsList";
import ProductSkeleton from "../skeletons/ProductSkeleton";

const fetchTrendingProducts = async () => {
  const { data } = await axios.get(`/products/trending-products?limit=4`);

  return data.data.products;
};
const TrendingProducts = () => {
  const { data: productsData, isLoading } = useQuery(
    ["trending-products"],
    fetchTrendingProducts
  );

  return (
    <section className="trending__products">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section__title">Trending Products</h2>
          </Col>
        </Row>

        <Row className="align-items-end">
          {isLoading ? (
            [...Array(4)].map((_, index) => <ProductSkeleton key={index} />)
          ) : (
            <ProductsList data={productsData} />
          )}
        </Row>
      </Container>
    </section>
  );
};

export default TrendingProducts;
