import React, { useEffect, useState } from "react";
import { Form, FormFeedback, FormGroup, Spinner } from "reactstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../../Components/UI/FormInput";
import SelectCategory from "../../Components/UI/SelectCategory";
import Button from "../../Components/UI/Button";
import axios from "axios";
import { useQuery } from "react-query";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import { EditProductSchema } from "../../Validations/EditProductSchema";

const fetchProductDetails = async ({ queryKey }) => {
  const [, productId] = queryKey;
  const { data } = await axios.get(`/products/${productId}`);

  return data.data.product;
};
const EditProductForm = ({ productId }) => {
  const [file, setFile] = useState();

  const { data: product, isLoading } = useQuery(
    ["product-details", productId],
    fetchProductDetails
  );

  const { editProduct } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(EditProductSchema),
  });

  const handleUpdateProduct = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "productImage") formData.append(key, data[key]);
    });

    if (file) formData.append("productImage", file);

    await editProduct(productId, formData);
  };

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];

    if (file) setFile(file);
  };

  useEffect(() => {
    if (!isLoading) {
      setValue("category", product.category._id.toString());
      setValue("productName", product.productName);
      setValue("shortDesc", product.shortDesc);
      setValue("description", product.description);
      setValue("price", product.price.toString());
      setValue("quantity", product.quantity.toString());
    }
  }, [product]);

  if (isLoading)
    return (
      <div  className="text-center py-5">
        <Spinner color="primary" />
      </div>
    );

  return (
    <Form onSubmit={handleSubmit(handleUpdateProduct)}>
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

      <Button type="submit">Update</Button>
    </Form>
  );
};

export default EditProductForm;
