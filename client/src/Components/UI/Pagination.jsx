import React from "react";
import {
  PaginationItem,
  PaginationLink,
  Pagination as PaginationBootStrap,
} from "reactstrap";

const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <PaginationBootStrap aria-label="Page navigation">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => handlePageChange(currentPage - 1)}
        />
      </PaginationItem>
      {[...Array(totalPages)].map((_, index) => (
        <PaginationItem active={index + 1 === currentPage} key={index}>
          <PaginationLink onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          next
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </PaginationItem>
    </PaginationBootStrap>
  );
};

export default Pagination;
