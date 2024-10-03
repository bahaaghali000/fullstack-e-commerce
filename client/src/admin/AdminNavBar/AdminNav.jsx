import { Container, Row } from "reactstrap";
import "../../styles/admin-nav.css";
import { useCallback, useEffect } from "react";
import AdminNavLogo from "./AdminNavLogo";
import Search from "../../Components/UI/Search";
import AdminNavLinks from "./AdminNavLinks";
import AdminNavProfile from "./AdminNavProfile";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const AdminNav = ({ setSearch, search }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/dashboard/all-products")
      navigate("/dashboard/all-products");
  }, [search]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <AdminNavLogo />

              <Search setSearch={handleSearchChange} />

              <AdminNavProfile />
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu">
        <Container>
          <Row>
            <div className="admin__navigation">
              <AdminNavLinks />
            </div>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AdminNav;
