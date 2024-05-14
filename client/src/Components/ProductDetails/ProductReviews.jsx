import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import AddRating from "./AddRating";

const ProductReviews = ({ productDescription, productId }) => {
  const [isDesc, setIsDesc] = useState(true);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    // get product ratings
    axios
      .get(`/api/rating/${productId}`)
      .then(({ data }) => setRatings(data.data));
  }, []);

  return (
    <section>
      <Row>
        <Col lg="12">
          <div className="product__tabs">
            <span
              onClick={() => setIsDesc(true)}
              className={isDesc ? "active" : ""}
            >
              Description
            </span>

            <span
              onClick={() => setIsDesc(false)}
              className={!isDesc ? "active" : ""}
            >
              Reviews ({ratings.length > 0 ? ratings.length : 0})
            </span>
          </div>
          <p>
            {isDesc ? (
              <p className="lh-md">{productDescription}</p>
            ) : (
              <AddRating
                ratings={ratings}
                setRatings={setRatings}
                productId={productId}
              />
            )}
          </p>
        </Col>
      </Row>
    </section>
  );
};

export default ProductReviews;
