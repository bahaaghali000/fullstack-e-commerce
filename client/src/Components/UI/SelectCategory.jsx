import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchCategories = async () => {
  const { data } = await axios.get(`/category`);
  return data.data;
};

const SelectCategory = (props) => {
  const {
    setValue,
    value,
    defaultOption,
    className = "",
    register = undefined,
    ...restProps
  } = props;
  const { data, isLoading } = useQuery(["categories"], fetchCategories);

  const handleChange = (e) => {
    if (setValue) {
      setValue(e.target.value);
    }

    if (restProps.onChange) {
      restProps.onChange(e);
    }
  };

  return (
    <select
      {...restProps}
      {...(register ? register : {})}
      className={className}
      onChange={handleChange}
      value={value}
    >
      {defaultOption && (
        <option value="">{isLoading ? "Loading..." : defaultOption}</option>
      )}
      {!isLoading &&
        data?.map((c) => (
          <option
            key={c._id}
            value={c._id}
            style={{ textTransform: "capitalize" }}
          >
            {c.categoryName}
          </option>
        ))}
    </select>
  );
};

export default SelectCategory;
