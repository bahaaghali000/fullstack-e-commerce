import React from "react";
import { useNavigate } from "react-router-dom";
import { convertToCurrency } from "../../utils";
import DeleteProduct from "./DeleteProduct";

const ProductsTable = ({ products }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-product/${id}`);
  };

  return (
    <table className="table bordered">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products?.map((product) => (
          <tr key={product._id}>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${product.imgUrl}`}
                className="product__image"
                alt={product.productName}
              />
            </td>
            <td className="truncate" style={{ maxWidth: "300px" }}>
              {product.productName}
            </td>
            <td>
              {product?.category?.categoryName
                ? product?.category?.categoryName
                : "None"}
            </td>
            <td>{convertToCurrency(product.price, "USD")}</td>
            <td>
              <div className=" d-flex align-items-center justify-content-center gap-1 ">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="btn btn-primary rounded-5 "
                >
                  <i className="ri-edit-line"></i>
                </button>
                <DeleteProduct product={product} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
