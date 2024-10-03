import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddCategorySchema } from "../../Validations/AddCategorySchema";
import Model from "../../Components/UI/Model";
import { Form } from "reactstrap";
import FormInput from "../../Components/UI/FormInput";
import useEditCategory from "../../hooks/useEditCategory";

const EditCategory = ({ category }) => {
  const [showModel, setShowModel] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddCategorySchema),
  });

  const { editCategory } = useEditCategory();

  const onSubmit = async (data) => {
    await editCategory(category._id, data.categoryName);

    handleCloseModal();
    setValue("categoryName", "");
  };

  const handleOpenModal = () => setShowModel(true);
  const handleCloseModal = () => setShowModel(false);

  useEffect(() => {
    setValue("categoryName", category.categoryName);
  }, [category]);

  return (
    <>
      <button onClick={handleOpenModal} className="btn btn-primary rounded-5 ">
        <i className="ri-edit-line"></i>
      </button>

      <Model
        handleClose={handleCloseModal}
        showModel={showModel}
        handleSubmit={handleSubmit(onSubmit)}
        modalTitle="Edit Category"
        cancelBtnText="Cancel"
        sumbitBtnText="Edit"
        centered={true}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Category Name"
            placeholder="Enter Category Name"
            register={register("categoryName")}
            error={errors.categoryName?.message}
          />
        </Form>
      </Model>
    </>
  );
};

export default EditCategory;
