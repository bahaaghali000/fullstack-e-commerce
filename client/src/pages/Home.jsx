import { useEffect, useState } from "react";
import "../styles/home.css";
import Helmet from "../Components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero-img.png";
import Services from "../Components/Services/Services";
import ProductsList from "../Components/UI/ProductsList";
import Clock from "../Components/UI/Clock";
import counterImg from "../assets/images/counter-timer-img.png";
import useGetData from "../hooks/useGetData";

const Home = () => {
  const { data: products, loading } = useGetData(
    "https://multimart-ecommerce-hr2c.onrender.com//api/products/all-products"
  );

  const [bestSales, setBestSales] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [mobilesProducts, setMobilesProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const filterBestSales = products.filter(
      (product) => product.category === "sofa"
    );
    const filterTrendingProducts = products.filter(
      (product) => product.category === "chair"
    );

    const filterMobiles = products.filter(
      (product) => product.category === "mobile"
    );

    const filterWireless = products.filter(
      (product) => product.category === "wireless"
    );

    const filterPopularProducts = products.filter(
      (product) => product.category === "watch"
    );
    setBestSales(filterBestSales);
    setTrendingProducts(filterTrendingProducts);
    setMobilesProducts(filterMobiles);
    setWirelessProducts(filterWireless);
    setPopularProducts(filterPopularProducts);
  }, [products]);

  const year = new Date().getFullYear();

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Treanding product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quidem quo eaque placeat quae aliquid odio vitae numquam sunt
                  facilis laboriosam.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__image">
                <img src={heroImage} alt="Hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ) : (
              <ProductsList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="beat__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
          </Row>
          <Row className="align-items-end">
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ) : (
              <ProductsList data={bestSales} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
          </Row>
          <Row className="align-items-end">
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ) : (
              <ProductsList data={mobilesProducts} />
            )}

            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ) : (
              <ProductsList data={wirelessProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="popular__cateory">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in category</h2>
            </Col>
          </Row>
          <Row className="align-items-end">
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ) : (
              <ProductsList data={popularProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
