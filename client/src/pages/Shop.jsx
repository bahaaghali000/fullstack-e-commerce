import { Col, Container, Row } from "reactstrap";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../styles/shop.css";
import { useEffect, useState } from "react";
import ProductsList from "../Components/UI/ProductsList";
import useGetData from "../hooks/useGetData";

const Shop = () => {
  const { data: productsData, loading } = useGetData(
    "https://multimart-ecommerce-hr2c.onrender.com/api/products/all-products"
  );

  const [products, setProducts] = useState(productsData);
  const [sorting, setSorting] = useState("");

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;

    if (filterValue) {
      const filteredProducts = productsData.filter(
        (product) => product.category === filterValue
      );

      setProducts(filteredProducts);
    } else {
      setProducts(productsData);
    }
  };

  useEffect(() => {
    if (sorting === "ascending") {
      const sortedProducts = productsData.sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (sorting === "descending") {
      const sortedProducts = productsData.sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    } else {
      setProducts(productsData);
    }
  }, [sorting]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;

    if (searchValue) {
      const searchResult = productsData.filter((product) => {
        return product.productName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setProducts(searchResult);
    } else {
      setProducts(productsData);
    }
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section className="shop">
        <Container>
          <Row>
            <Col lg="3" md="6" sm="6">
              <select onChange={handleFilter}>
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
                <option value="descending">Descending</option>
              </select>
            </Col>

            <Col lg="6" md="12" className="d-block">
              <div className="search__box">
                <input
                  type="text"
                  onChange={handleSearch}
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
              <h5 className="fw-bold">Loading....</h5>
            ) : (
              <>
                {products.length > 0 ? (
                  <ProductsList data={products} />
                ) : (
                  <h1 className="text-center fs-4">No Products Are Found</h1>
                )}
              </>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
