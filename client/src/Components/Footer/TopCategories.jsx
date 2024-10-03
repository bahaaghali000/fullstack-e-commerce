import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const TopCategories = () => {
  return (
    <div className="footer__quick-links">
      <h4 className="footer__quick-title">Top Categories</h4>
      <ListGroup className="mt-3">
        <ListGroupItem className="p-0 border-0 mb-3">
          <Link to="#">Mobile Phones</Link>
        </ListGroupItem>

        <ListGroupItem className="p-0 border-0 mb-3">
          <Link to="#">Modern Sofa</Link>
        </ListGroupItem>

        <ListGroupItem className="p-0 border-0 mb-3">
          <Link to="#">Arm Chair</Link>
        </ListGroupItem>

        <ListGroupItem className="p-0 border-0 mb-3">
          <Link to="#">Smart Watches</Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default TopCategories;
