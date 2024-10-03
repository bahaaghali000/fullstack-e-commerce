import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const Contact = () => {
  return (
    <div className="footer__quick-links">
      <h4 className="footer__quick-title">Contact</h4>
      <ListGroup className="mt-3 footer__contact">
        <ListGroupItem className="p-0 border-0 mb-2 d-flex align-items-center gap-2">
          <span>
            <i className="ri-map-pin-line"></i>
          </span>
          <p>Bani Mazar, Al Minya, Egypt</p>
        </ListGroupItem>

        <ListGroupItem className="p-0 border-0 mb-2 d-flex align-items-center gap-2">
          <span>
            <i className="ri-phone-line"></i>
          </span>
          <p>+201025265027</p>
        </ListGroupItem>

        <ListGroupItem className="p-0 border-0 mb-2 d-flex align-items-center gap-2">
          <span>
            <i className="ri-mail-line"></i>
          </span>
          <p>bahaaghali000@gmail.com</p>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Contact;
