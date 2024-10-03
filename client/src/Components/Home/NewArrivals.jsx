import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Col, Container, Row } from "reactstrap";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import ProductsList from "../UI/ProductsList";

const fetchNewArrivalsProducts = async () => {
  const { data } = await axios.get(`/products?sort=-createdAt&limit=4`);
  return data.data.products;
};

const NewArrivals = () => {
  const { data: productsData, isLoading } = useQuery(
    ["new-arrivals-products"],
    fetchNewArrivalsProducts
  );

  return (
    <section className="new__arrivals">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section__title">New Arrivals</h2>
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

export default NewArrivals;
