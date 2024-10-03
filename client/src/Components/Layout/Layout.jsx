import Header from "../Header/Header";
import "../../App.css";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import { useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "../UI/LoadingPage";
import ErrorBoundary from "../ErrorBoundary";
import AdminNav from "../../admin/AdminNavBar/AdminNav";
import SomethingWentWrong from "../../pages/SomethingWentWrong";

const Layout = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {location.pathname.startsWith("/dashboard") ? (
        <AdminNav setSearch={setSearch} search={search} />
      ) : (
        <Header />
      )}

      <ErrorBoundary fallback={<SomethingWentWrong />}>
      <Suspense fallback={<LoadingPage />}>
        <main>
          <Routers searchValue={search} />
        </main>
      </Suspense>
      </ErrorBoundary>

      <Footer />
    </>
  );
};

export default Layout;
