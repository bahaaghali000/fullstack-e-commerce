import React, { useEffect } from "react";
import FormInput from "../UI/FormInput";
import { Form, FormFeedback, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddRatingSchema } from "../../Validations/AddRatingSchema";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import StarRating from "../UI/StarRating";
import useAddRating from "../../hooks/useAddRating";

const AddRatingForm = ({ productId }) => {
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddRatingSchema),
  });

  const { submitRating } = useAddRating();

  const onSubmit = async (data) => {
    await submitRating(productId, data);
    setValue("rating", 0);
    setValue("comment", "");
  };

  const handleRating = (rating) => {
    setValue("rating", rating);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h4 className="text-dark">Leave your experience</h4>

      <FormInput
        placeholder="Enter Your Name"
        value={user.username}
        disabled={true}
        className="w-100"
      />

      <FormGroup className="d-flex justify-content-center align-items-center flex-column w-100">
        <StarRating
          defaultRating={0}
          onSetRating={handleRating}
          className=" justify-content-center w-100"
        />
        {errors.rating?.message && (
          <FormFeedback className="text-center d-block">
            {errors.rating?.message}
          </FormFeedback>
        )}
      </FormGroup>

      <FormGroup className="w-100">
        <textarea
          rows="4"
          className={`form-control ${
            errors.comment?.message ? "is-invalid" : ""
          } `}
          placeholder="Review Message"
          {...register("comment")}
        ></textarea>
        {errors.comment?.message && (
          <FormFeedback className="text-start d-block">
            {errors.comment?.message}
          </FormFeedback>
        )}
      </FormGroup>

      <motion.button whileTap={{ scale: 1.5 }} className="buy__btn">
        Submit
      </motion.button>
    </Form>
  );
};

export default AddRatingForm;
