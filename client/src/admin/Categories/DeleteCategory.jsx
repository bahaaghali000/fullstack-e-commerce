import React, { useState } from "react";
import useDeleteCategory from "../../hooks/useDeleteCategory";
import Model from "../../Components/UI/Model";

const DeleteCategory = ({ category }) => {
  const [showModel, setShowModel] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const { deleteCategory } = useDeleteCategory();

  const handleDelete = (id) => {
    setCategoryId(id);
    handleOpenModal();
  };

  const handleOpenModal = () => setShowModel(true);

  const handleCloseModal = () => {
    setShowModel(false);
    setCategoryId("");
  };

  const handleSubmit = async () => {
    if (categoryId) {
      await deleteCategory(categoryId);
      handleCloseModal();
    }
  };

  return (
    <>
      <button
        onClick={() => handleDelete(category._id)}
        className="btn btn-danger rounded-5 "
      >
        <i className="ri-delete-bin-line"></i>
      </button>

      <Model
        handleClose={handleCloseModal}
        showModel={showModel}
        handleSubmit={handleSubmit}
        modalTitle="Delete Category"
        cancelBtnText="Cancel"
        sumbitBtnText="Delete"
      >
        <h5>
          Are you sure you wanna delete "{category.categoryName}" category?
        </h5>
      </Model>
    </>
  );
};

export default DeleteCategory;
