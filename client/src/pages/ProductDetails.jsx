import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../styles/product-details.css";
import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import ProductsList from "../Components/UI/ProductsList";
import axios from "axios";
import useFilterProducts from "../hooks/useFilterProducts";
import ProductInfo from "../Components/ProductDetails/ProductInfo";
import ProductReviews from "../Components/ProductDetails/ProductReviews";
import ProductDetailsSkeleton from "../Components/skeletons/ProductDetailsSkeleton";
import ProductSkeleton from "../Components/skeletons/ProductSkeleton";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [favorite, setFavorite] = useState(false);
  const { favItems } = useSelector((state) => state.fav);
  const [isLoading, setIsLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();

  const { fetchProducts, loading } = useFilterProducts();

  useEffect(() => {
    const fetchTheProduct = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data.data);
        const isExsit = favItems.find((item) => item._id === data.data._id);
        if (isExsit) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTheProduct();
  }, [id]);

  useEffect(() => {
    // Get Related Products
    fetchProducts("", product.category).then((data) => {
      const products = [...data];
      // Exclude the product Opened
      const index = products.findIndex((p) => p._id === product._id);
      products.splice(index, 1);
      setRelatedProducts(products);
    });
  }, [product]);



  return (
    <Helmet title={product.productName}>
      <CommonSection title={product.productName} />
      <Container>
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <>
            <ProductInfo
              product={product}
              setFavorite={setFavorite}
              favorite={favorite}
            />

            <ProductReviews
              productDescription={product.description}
              productId={product._id}
            />

            <Row className=" align-items-end mb-5 ">
              <Col lg="12" className="mt-5">
                <h2 className="related__title">You might also like</h2>
              </Col>

              {loading ? (
                [...Array(4)].map((_, idx) => <ProductSkeleton key={idx} />)
              ) : (
                <ProductsList data={relatedProducts} />
              )}
            </Row>
          </>
        )}
      </Container>
    </Helmet>
  );
};

export default ProductDetails;
