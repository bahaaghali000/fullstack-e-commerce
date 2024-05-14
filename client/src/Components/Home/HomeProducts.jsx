import React, { useEffect, useState } from "react";
import ProductsList from "../UI/ProductsList";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import ProductSkeleton from "../skeletons/ProductSkeleton";

const HomeProducts = ({ className, heading, category }) => {
  const [productsData, setProductsData] = useState([]);

  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    const filtered = products.filter((p) => p.category === category);
    setProductsData(filtered);
  }, [category, isLoading]);

  return (
    <section className={className}>
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="section__title">{heading}</h2>
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

export default HomeProducts;
