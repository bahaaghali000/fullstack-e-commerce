import React from "react";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const CategoriesTable = ({ categories }) => {
  return (
    <table className="table bordered">
      <thead>
        <tr>
          <th>#</th>
          <th className="text-center">Category Name</th>
          <th>Total Products</th>
          <th className=" text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {categories.map((c, index) => (
          <tr key={c._id}>
            <td>{index + 1}</td>
            <td className="text-center" style={{ textTransform: "capitalize" }}>
              {c.categoryName}
            </td>
            <td className="category__author px-5">{c.products.length}</td>
            <td>
              <div className=" d-flex align-items-center justify-content-center gap-1 ">
                <EditCategory category={c} />
                <DeleteCategory category={c} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
