import React, { useState } from "react";
import Model from "../../Components/UI/Model";
import useDeleteProduct from "../../hooks/useDeleteProduct";

const DeleteProduct = ({ product }) => {
  const [showModel, setShowModel] = useState(false);
  const [productId, setProductId] = useState("");

  const { deleteProduct } = useDeleteProduct();

  const handleDelete = (id) => {
    setProductId(id);
    handleOpenModal();
  };

  const handleOpenModal = () => setShowModel(true);

  const handleCloseModal = () => {
    setShowModel(false);
    setProductId("");
  };

  const handleSubmit = async () => {
    if (productId) {
      await deleteProduct(productId);
      handleCloseModal();
    }
  };
  return (
    <>
      <button
        onClick={() => handleDelete(product._id)}
        className="btn btn-danger rounded-5 "
      >
        <i className="ri-delete-bin-line"></i>
      </button>

      <Model
        handleClose={handleCloseModal}
        showModel={showModel}
        handleSubmit={handleSubmit}
        modalTitle="Delete Product"
        cancelBtnText="Cancel"
        sumbitBtnText="Delete"
      >
        <h5>Are you sure you wanna delete this product?</h5>
      </Model>
    </>
  );
};

export default DeleteProduct;
