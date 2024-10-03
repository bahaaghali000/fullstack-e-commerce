import React from "react";
import { Col } from "reactstrap";

const DashboardCardBox = ({ className, title, value }) => {
  return (
    <Col lg="3" md="6" sm="6" className=" mb-3">
      <div className={className}>
        <h5>{title}</h5>
        <span>{value}</span>
      </div>
    </Col>
  );
};

export default DashboardCardBox;
