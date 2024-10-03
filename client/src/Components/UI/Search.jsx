import React from "react";

const Search = ({ setSearch, search }) => {
  return (
    <div className="search__box">
      <input
        type="text"
        onChange={setSearch}
        value={search}
        placeholder="Search...."
      />
      <span>
        <i className="ri-search-line"></i>
      </span>
    </div>
  );
};

export default Search;
