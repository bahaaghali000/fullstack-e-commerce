import { Col, Container, Row } from "reactstrap";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../styles/shop.css";
import { useEffect, useState } from "react";
import ProductsList from "../Components/UI/ProductsList";
import useFilterProducts from "../hooks/useFilterProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import ProductSkeleton from "../Components/skeletons/ProductSkeleton";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [sorting, setSorting] = useState("");

  const { fetchProducts } = useFilterProducts();

  useEffect(() => {
    setLoading(true);
    let timeout;
    timeout = setTimeout(async () => {
      const data = await fetchProducts(search, filterValue, sorting);
      setLoading(false);
      setProducts(data);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, filterValue, sorting]);

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section className="shop">
        <Container>
          <Row>
            <Col lg="3" md="6" sm="6">
              <select
                onChange={(e) => setFilterValue(e.target.value)}
                value={filterValue}
              >
                <option value="">Filter By Category</option>
                <option value="sofa">Sofa</option>
                <option value="mobile">Mobile</option>
                <option value="chair">Chair</option>
                <option value="watch">Watch</option>
                <option value="wireless">Wireless</option>
              </select>
            </Col>

            <Col lg="3" md="6" sm="6" className="text-end">
              <select onChange={(e) => setSorting(e.target.value)}>
                <option value="none">Sort By</option>
                <option value="ascending">Ascending</option>
                <option value="p">Descending</option>
              </select>
            </Col>

            <Col lg="6" md="12" className="d-block">
              <div className="search__box">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Search...."
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row className=" align-items-end ">
            {loading ? (
              [...Array(10)].map((_, index) => <ProductSkeleton key={index} />)
            ) : products?.length > 0 ? (
              <ProductsList data={products} />
            ) : (
              <h1 className="text-center fs-4">No Products Are Found</h1>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
