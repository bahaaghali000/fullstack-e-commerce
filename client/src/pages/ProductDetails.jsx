import { useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../styles/product-details.css";
import { Container } from "reactstrap";
import axios from "axios";
import ProductInfo from "../Components/ProductDetails/ProductInfo";
import ProductReviews from "../Components/ProductDetails/ProductReviews";
import ProductDetailsSkeleton from "../Components/skeletons/ProductDetailsSkeleton";
import { useQuery } from "react-query";
import RelatedProducts from "../Components/ProductDetails/RelatedProducts";

const fetchProductDetails = async ({ queryKey }) => {
  const [, id] = queryKey;
  const { data } = await axios.get(`/products/${id}`);

  return data.data;
};

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["product-details", id],
    fetchProductDetails
  );

  return (
    <Helmet title={data?.product?.productName}>
      <CommonSection title={data?.product?.productName} />
      <Container>
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <>
            <ProductInfo data={data} />

            <ProductReviews
              productDescription={data.product.description}
              productId={data.product._id}
            />

            <RelatedProducts productId={id} />
          </>
        )}
      </Container>
    </Helmet>
  );
};

export default ProductDetails;
