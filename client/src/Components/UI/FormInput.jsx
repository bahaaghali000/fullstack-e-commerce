import React from "react";
import { FormFeedback, FormGroup } from "reactstrap";

const FormInput = ({
  label,
  register,
  placeholder,
  showFeedback = true,
  error,
  disabled = false,
  className = "",
  type = "text",
  value,
}) => {
  return (
    <>
      {label && <h6 className="mb-2 text-danger">{label}</h6>}
      <FormGroup className={className}>
        <input
          type={type}
          className={`form-control ${error ? "is-invalid" : ""} `}
          placeholder={placeholder}
          {...register}
          disabled={disabled}
          value={value}
        />
        {showFeedback && error && (
          <FormFeedback className="text-start d-block">{error}</FormFeedback>
        )}
      </FormGroup>
    </>
  );
};

export default FormInput;
