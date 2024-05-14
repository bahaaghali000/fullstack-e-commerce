import Header from "../Header/Header";
import "../../App.css";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import { useLocation } from "react-router-dom";
import AdminNav from "../../admin/AdminNav";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "../UI/LoadingPage";

const Layout = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const searchValue = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {location.pathname.startsWith("/dashboard") ? (
        <AdminNav searchValue={searchValue} />
      ) : (
        <Header />
      )}

      <Suspense fallback={<LoadingPage />}>
        <main>
          <Routers searchValue={search} />
        </main>
      </Suspense>

      <Footer />
    </>
  );
};

export default Layout;
