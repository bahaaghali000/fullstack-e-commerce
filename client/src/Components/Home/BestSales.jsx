import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Col, Container, Row } from "reactstrap";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import ProductsList from "../UI/ProductsList";

const fetchBestSalesProducts = async () => {
  const { data } = await axios.get(`/products/best-sales?limit=4`);

  return data.data.products;
};
const BestSales = () => {
  const { data: productsData, isLoading } = useQuery(
    ["best-sales-products"],
    fetchBestSalesProducts
  );

  return (
    <section className="best__sales">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section__title">Best Sales</h2>
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

export default BestSales;
