import React from "react";
import { Col, Row } from "reactstrap";
import Skeleton from "react-loading-skeleton";
import ProductSkeleton from "./ProductSkeleton";

const ProductDetailsSkeleton = () => {
  return (
    <>
      <Row className=" justify-content-center align-items-center  ">
        <Col lg="6" md="6" sm="12" className="mt-2">
          <Skeleton width={330} height={330} />
        </Col>

        <Col lg="6" md="6" sm="12">
          <Skeleton width={170} height={40} />
          <div className="d-flex gap-5 mt-2 mb-3">
            <Skeleton width={100} />
            <Skeleton width={70} />
          </div>
          <div className="d-flex gap-3 mb-4">
            <Skeleton width={70} />
            <Skeleton width={120} />
            <Skeleton width={40} />
          </div>
          <Skeleton width={350} />
          <Skeleton width={120} height={40} style={{ marginTop: "30px" }} />
        </Col>
      </Row>

      <Row className="mt-5">
        <div className="d-flex gap-3 mb-3">
          <Skeleton width={100} height={25} />
          <Skeleton width={100} height={25} />
        </div>
        <Skeleton className="w-full" count={3} />
      </Row>

      <Row className="mt-5">
        <Skeleton width={160} height={20} className="mb-4" />
        {[...Array(4)].map((_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </Row>
    </>
  );
};

export default ProductDetailsSkeleton;
