import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const UsefulLinks = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="footer__quick-links">
      <h4 className="footer__quick-title">Useful Links</h4>
      <ListGroup className="mt-3">
        <ListGroupItem className="p-0 border-0 mb-3">
          <Link to="/shop">Shop</Link>
        </ListGroupItem>

        <ListGroupItem className="p-0 border-0 mb-3">
          <Link to="/cart">Cart</Link>
        </ListGroupItem>

        <ListGroupItem className="p-0 border-0 mb-3">
          {isAuthenticated ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </ListGroupItem>

        <ListGroupItem className="p-0 border-0 mb-3">
          <Link to="#">Privacy Policy</Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default UsefulLinks;
