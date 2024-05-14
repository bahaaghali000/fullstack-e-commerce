import Skeleton from "react-loading-skeleton";
import "./product-skeleton.css";
import { Col } from "reactstrap";

const ProductSkeleton = () => {
  return (
    <Col lg="3" md="6" sm="12" xs="12" className="product__skeleton">
      <div className="product__skeleton-top">
        <Skeleton height={216} width={216} />
      </div>
      <div className="product__skeleton-bottom">
        <Skeleton count={3} width={216} />
      </div>
    </Col>
  );
};

export default ProductSkeleton;
