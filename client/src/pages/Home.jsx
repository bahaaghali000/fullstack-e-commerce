import "../styles/home.css";
import Helmet from "../Components/Helmet/Helmet";
import Services from "../Components/Services/Services";
import TimerCount from "../Components/Home/TimerCount";
import Hero from "../Components/Home/Hero";
import TrendingProducts from "../Components/Home/TrendingProducts";
import BestSales from "../Components/Home/BestSales";
import NewArrivals from "../Components/Home/NewArrivals";
import PopularInCategory from "../Components/Home/PopularInCategory";

const Home = () => {
  return (
    <Helmet title={"Home"}>
      <Hero />

      <Services />

      <TrendingProducts />

      <BestSales />

      <TimerCount />

      <NewArrivals />

      <PopularInCategory />
    </Helmet>
  );
};

export default Home;
