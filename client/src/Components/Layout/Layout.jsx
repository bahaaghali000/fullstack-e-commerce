import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";

import { useLocation } from "react-router-dom";
import AdminNav from "../../admin/AdminNav";
import { useEffect, useState } from "react";

const Layout = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const searchValue = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {location.pathname.startsWith("/dashboard") ? (
        <AdminNav searchValue={searchValue} />
      ) : (
        <Header />
      )}

      <main>
        <Routers searchValue={search} />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
