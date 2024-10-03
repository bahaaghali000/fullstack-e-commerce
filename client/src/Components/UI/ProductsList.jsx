import ProductCard from "./ProductCard";
import { Col } from "reactstrap";
const ProductsList = ({ data }) => {
  return (
    <>
      {data.map((product, index) => (
        <Col key={product._id} lg="3" md="6" sm="12" xs="12">
          <ProductCard product={product} key={index} />
        </Col>
      ))}
    </>
  );
};

export default ProductsList;
