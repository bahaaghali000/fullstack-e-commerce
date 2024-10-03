import React from "react";

const SortingList = ({ setSorting }) => {
  return (
    <select onChange={(e) => setSorting(e.target.value)}>
      <option value="none">Sort By</option>
      <option value="-price">Ascending</option>
      <option value="price">Descending</option>
    </select>
  );
};

export default SortingList;
