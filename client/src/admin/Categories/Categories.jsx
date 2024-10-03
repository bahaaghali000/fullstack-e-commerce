import React from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Row } from "reactstrap";
import CategoriesTable from "./CategoriesTable";
import AddCategory from "./AddCategory";
import axios from "axios";
import { useQuery } from "react-query";

const fetchCategories = async () => {
  const { data } = await axios.get(`/category`);
  return data.data;
};

const Categories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery(["categories"], fetchCategories);

  return (
    <div className=" py-3">
      <AddCategory />

      <Row>
        <Col lg="12" md="12" sm="6" className="">
          {error && <h6 className="text-center fw-bold">{error}</h6>}
          {isLoading &&
            [...Array(7)].map((_, idx) => (
              <div
                key={idx}
                className=" d-flex justify-content-between  align-items-center mb-3"
              >
                <Skeleton width={150} />
                <Skeleton width={100} />
                <div className=" d-flex align-items-center justify-content-center gap-1 ">
                  <Skeleton width={50} height={50} className=" rounded-5" />
                  <Skeleton width={50} height={50} className=" rounded-5" />
                </div>
              </div>
            ))}

          {!error &&
            !isLoading &&
            (categories.length > 0 ? (
              <CategoriesTable categories={categories} />
            ) : (
              <h6 className="text-center fw-bold">No categories exsited yet</h6>
            ))}
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
