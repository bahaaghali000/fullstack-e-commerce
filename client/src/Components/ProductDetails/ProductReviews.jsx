import axios from "axios";
import React, { useState, useTransition } from "react";
import { Col, Row } from "reactstrap";
import AddRating from "./AddRating";
import ProductTab from "./ProductTab";
import { useQuery } from "react-query";

const fetchRatings = async ({ queryKey }) => {
  const [, productId] = queryKey;
  const { data } = await axios.get(`/rating/${productId}`);

  return data.data;
};

const ProductReviews = ({ productDescription, productId }) => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("desc");

  const { data: ratings, isLoading } = useQuery(
    ["ratings", productId],
    fetchRatings
  );

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <section>
      <Row>
        <Col lg="12">
          <div className="product__tabs">
            <ProductTab
              isActive={tab === "desc"}
              onClick={() => selectTab("desc")}
            >
              Description
            </ProductTab>

            <ProductTab
              isActive={tab === "ratings"}
              onClick={() => selectTab("ratings")}
            >
              Reviews ({ratings?.length || 0})
            </ProductTab>
          </div>

          {(isPending || isLoading) && (
            <p className="text-center">Loading...</p>
          )}

          {!isPending && tab === "desc" && (
            <p className="lh-md">{productDescription}</p>
          )}

          {!isPending && tab === "ratings" && (
            <AddRating ratings={ratings} productId={productId} />
          )}
        </Col>
      </Row>
    </section>
  );
};

export default ProductReviews;
