import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Col, Container, Row } from "reactstrap";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import ProductsList from "../UI/ProductsList";

const fetchPopularInCategoryProducts = async () => {
  const { data } = await axios.get(`/products/most-viewed-products?limit=4`);
  return data.data;
};

const PopularInCategory = () => {
  const { data: productsData, isLoading } = useQuery(
    ["most-viewed-products"],
    fetchPopularInCategoryProducts
  );

  return (
    <section className="popular__cateory">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section__title">Popular in category</h2>
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

export default PopularInCategory;
