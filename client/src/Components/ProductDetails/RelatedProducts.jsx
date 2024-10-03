import React from "react";
import { useQuery } from "react-query";
import { Col, Row } from "reactstrap";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import ProductsList from "../UI/ProductsList";
import axios from "axios";

const fetchRelatedProducts = async ({ queryKey }) => {
  const [, productId] = queryKey;
  const { data } = await axios.get(
    `/products/${productId}/related-products?limit=8`
  );

  return data.data;
};

const RelatedProducts = ({ productId }) => {
  const { data, isLoading } = useQuery(
    ["related-products", productId],
    fetchRelatedProducts
  );

  return (
    <Row className=" align-items-end mb-5 ">
      <Col lg="12" className="mt-5">
        <h2 className="related__title">You might also like</h2>
      </Col>

      {isLoading ? (
        [...Array(4)].map((_, idx) => <ProductSkeleton key={idx} />)
      ) : data?.length > 0 ? (
        <ProductsList data={data} />
      ) : (
        <p className="text-center">Not Ex</p>
      )}
    </Row>
  );
};

export default RelatedProducts;
