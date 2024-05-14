import "../styles/home.css";
import Helmet from "../Components/Helmet/Helmet";
import Services from "../Components/Services/Services";
import HomeProducts from "../Components/Home/HomeProducts";
import TimerCount from "../Components/Home/TimerCount";
import Hero from "../Components/Home/Hero";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";

const Home = () => {
  const dipatch = useDispatch();

  useEffect(() => {
    dipatch(fetchProducts());
  }, [dipatch]);

  return (
    <Helmet title={"Home"}>
      <Hero />

      <Services />

      <HomeProducts
        className="trending__products"
        heading="Trending Products"
        category="chair"
      />

      <HomeProducts
        className="beat__sales"
        heading="Best Sales"
        category="sofa"
      />

      <TimerCount />

      <HomeProducts
        className="new__arrivals"
        heading="New Arrivals"
        category="mobile"
      />

      <HomeProducts
        className="popular__cateory"
        heading="Popular in category"
        category="watch"
      />
    </Helmet>
  );
};

export default Home;
