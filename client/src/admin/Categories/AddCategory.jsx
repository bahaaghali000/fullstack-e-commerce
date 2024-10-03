import React, { useState } from "react";
import useAddCategory from "../../hooks/useAddCategory";
import Model from "../../Components/UI/Model";
import FormInput from "../../Components/UI/FormInput";
import { Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { AddCategorySchema } from "../../Validations/AddCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../Components/UI/Button";

const AddCategory = () => {
  const [showModel, setShowModel] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddCategorySchema),
  });

  const { addCategory } = useAddCategory();

  const onSubmit = async (data) => {
    await addCategory(data.categoryName);
    handleCloseModal();
  };

  const handleOpenModal = () => setShowModel(true);
  const handleCloseModal = () => setShowModel(false);

  return (
    <div className=" d-flex justify-content-between align-items-center mb-3">
      <h4 className=" fw-bold ">Categories</h4>
      <Button  onClick={handleOpenModal}>
        Add Category
      </Button>

      <Model
        handleClose={handleCloseModal}
        showModel={showModel}
        handleSubmit={handleSubmit(onSubmit)}
        modalTitle="Add Category"
        cancelBtnText="Cancel"
        sumbitBtnText="Add"
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
    </div>
  );
};

export default AddCategory;
