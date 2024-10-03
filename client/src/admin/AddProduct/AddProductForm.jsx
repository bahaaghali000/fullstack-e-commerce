import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AddProductSchema } from "../../Validations/AddProductSchema";
import { Form, FormFeedback, FormGroup } from "reactstrap";
import FormInput from "../../Components/UI/FormInput";
import Button from "../../Components/UI/Button";
import SelectCategory from "../../Components/UI/SelectCategory";
import useAddProduct from "../../hooks/useAddProduct";

const AddProductForm = () => {
  const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddProductSchema),
  });

  const { addProduct } = useAddProduct();

  const handleAddProduct = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "productImage") formData.append(key, data[key]);
    });

    if (file) formData.append("productImage", file);

    await addProduct(formData);
  };

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];

    if (file) setFile(file);
  };

  return (
    <Form onSubmit={handleSubmit(handleAddProduct)}>
      <FormInput
        register={register("productName")}
        placeholder={"Enter your Product Name"}
        label="Product Title"
        error={errors.productName?.message}
        showFeedback={true}
      />

      <FormInput
        register={register("shortDesc")}
        placeholder={"Enter Short Description"}
        label="Short Description"
        error={errors.shortDesc?.message}
      />

      <FormInput
        register={register("description")}
        placeholder={"Enter Description"}
        label="Description"
        error={errors.description?.message}
      />

      <div className="d-flex align-items-center justify-content-between gap-3">
        <div className="w-50">
          <FormInput
            type="number"
            register={register("price")}
            placeholder={"Enter Price"}
            label="Price"
            error={errors.price?.message}
          />
        </div>

        <div className="w-50">
          <span className="text-danger">Category</span>
          <FormGroup className=" p-2">
            <SelectCategory
              register={register("category")}
              defaultOption="Select Category"
              className={`form-control ${
                errors.category?.message ? "is-invalid" : ""
              }`}
            />
            {errors.category?.message && (
              <FormFeedback className="text-start d-block">
                {errors.category?.message}
              </FormFeedback>
            )}
          </FormGroup>
        </div>
      </div>

      <FormInput
        register={register("quantity")}
        placeholder={"Enter Quantity"}
        label="Quantity"
        error={errors.quantity?.message}
      />

      {/* <FormInput
        register={register("productImage")}
        label="Product Image"
        error={errors.productImage?.message}
        accept="image/*"
        onChange={handleChangeFile}
        type="file"
      /> */}
      <>
        <h6 className="mb-2 text-danger">Product Image</h6>
        <FormGroup>
          <input
            type="file"
            accept="image/*"
            className={`form-control ${
              errors.productImage?.message ? "is-invalid" : ""
            } `}
            {...register("productImage")}
            onChange={handleChangeFile}
          />
          {errors.productImage?.message && (
            <FormFeedback className="text-start d-block">
              {errors.productImage?.message}
            </FormFeedback>
          )}
        </FormGroup>
      </>

      <Button type="submit">Add Product</Button>
    </Form>
  );
};

export default AddProductForm;
