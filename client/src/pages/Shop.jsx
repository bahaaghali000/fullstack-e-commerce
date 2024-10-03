import { Col, Container, Row } from "reactstrap";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../styles/shop.css";
import { useCallback, useEffect, useState } from "react";
import ProductsList from "../Components/UI/ProductsList";
import ProductSkeleton from "../Components/skeletons/ProductSkeleton";
import { useQuery } from "react-query";
import SortingList from "../Components/Shop/SortingList";
import Search from "../Components/UI/Search";
import axios from "axios";
import debounce from "lodash.debounce";
import SelectCategory from "../Components/UI/SelectCategory";
import Pagination from "../Components/UI/Pagination";

const fetchProducts = async ({ queryKey }) => {
  const [, sorting, search, filterValue, currentPage] = queryKey;
  const { data } = await axios.get(
    `/products?sort=${sorting}&search=${search.trim()}&page=${currentPage}&limit=20${
      filterValue && `&category=${filterValue}`
    }`
  );
  return data.data;
};

const Shop = () => {
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [sorting, setSorting] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["products", sorting, search, filterValue, currentPage],
    fetchProducts
  );

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  if (isError) return <p>{error}</p>;

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section className="shop">
        <Container>
          <Row className="mb-3">
            <Col lg="3" md="6" sm="6">
              <SelectCategory
                setValue={setFilterValue}
                value={filterValue}
                defaultOption="Filter By Category"
              />
            </Col>

            <Col lg="3" md="6" sm="6" className="text-end">
              <SortingList setSorting={setSorting} />
            </Col>

            <Col lg="6" md="12" className="d-block">
              <Search setSearch={handleSearchChange} />
            </Col>
          </Row>

          <Row className=" align-items-end mb-3">
            {isLoading ? (
              [...Array(10)].map((_, index) => <ProductSkeleton key={index} />)
            ) : data?.products?.length > 0 ? (
              <ProductsList data={data?.products} />
            ) : (
              <h1 className="text-center fs-4">No Products Are Found</h1>
            )}
          </Row>
          {/* <Row className="mt-5">
            <Col lg="12" className="text-center">
              <button className="btn btn-primary" onClick={loadMore}>
                Load More
              </button>
            </Col>
          </Row> */}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
