import React from "react";
import { Form, FormGroup } from "reactstrap";

const BillingInformation = () => {
  return (
    <Form>
      <FormGroup className="form__group">
        <input type="text" placeholder="Enter your name" />
      </FormGroup>
      <FormGroup className="form__group">
        <input type="email" placeholder="Enter your email" />
      </FormGroup>
      <FormGroup className="form__group">
        <input type="tel" placeholder="Phone number" />
      </FormGroup>
      <FormGroup className="form__group">
        <input type="text" placeholder="Street address" />
      </FormGroup>
      <FormGroup className="form__group">
        <input type="text" placeholder="City" />
      </FormGroup>
      <FormGroup className="form__group">
        <input type="text" placeholder="Postal code" />
      </FormGroup>
      <FormGroup className="form__group">
        <input type="text" placeholder="Country" />
      </FormGroup>
    </Form>
  );
};

export default BillingInformation;
