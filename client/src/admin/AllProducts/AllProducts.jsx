import { Container, Row, Col } from "reactstrap";
import "../../styles/admin-nav.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Helmet from "../../Components/Helmet/Helmet";
import { useQuery } from "react-query";
import ProductsTable from "./ProductsTable";
import { useState } from "react";
import Pagination from "../../Components/UI/Pagination";

const fetchProducts = async ({ queryKey }) => {
  const [, searchValue, currentPage] = queryKey;
  const { data } = await axios.get(
    `/products?sort=-createdAt&search=${searchValue.trim()}&page=${currentPage}&limit=5`
  );

  return data.data;
};

const AllProducts = ({ searchValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery(
    ["products", searchValue, currentPage],
    fetchProducts
  );

  const totalPages = data?.totalPages || 1;

  return (
    <Helmet title="All Products">
      <section className="all__products">
        <Container>
          <Row>
            <Col lg="12" md="12" sm="6" className="text-center ">
              {isLoading ? (
                [...Array(7)].map((_, idx) => (
                  <div
                    key={idx}
                    className=" d-flex justify-content-between  align-items-center mb-3"
                  >
                    <Skeleton width={80} height={80} className=" mx-5 " />
                    <Skeleton width={200} />
                    <Skeleton width={200} />
                    <Skeleton width={100} />
                    <Skeleton width={80} className=" mx-5 " />
                  </div>
                ))
              ) : data?.products?.length > 0 ? (
                <>
                  <ProductsTable products={data?.products} />

                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </>
              ) : (
                <h6 className="text-center fw-bold py-5">
                  No Products exsited yet
                </h6>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllProducts;
