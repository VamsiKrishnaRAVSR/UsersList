import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import { Button } from "reactstrap";
import * as yup from "yup";
import { User } from "../../types";
import "./form.css";

const Forms = (props: {
  initialValues: User;
  onSubmit: (values: User) => void;
}) => {
  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    first_name: yup.string().required().label("First Name"),
    last_name: yup.string().required().label("Last Name"),
    date_of_birth: yup.date().required().label("Date Of Birth"),
    address: yup.string().required().label("Address"),
    city: yup.string().required().label("City"),
    pincode: yup.string().required().label("Pincode").max(6),
    avatar: yup.string().url().required().label("Image URL"),
  });

  return (
    <div className="formikComponent">
      <h3>User</h3>
      <Formik
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="formik-item">
            <label htmlFor="first_name">First Name</label>
            <Field id="first_name" name="first_name" type="text" />
            <ErrorMessage component="p" name="first_name" />
          </div>
          <div className="formik-item">
            <label htmlFor="last_name">Last Name</label>
            <Field id="last_name" name="last_name" type="text" />
            <ErrorMessage component="p" name="last_name" />
          </div>
          <div className="formik-item">
            <label htmlFor="date_of_birth">Date</label>
            <Field id="date_of_birth" name="date_of_birth" type="date" />
            <ErrorMessage component="p" name="date_of_birth" />
          </div>
          <div className="formik-item">
            <label htmlFor="address">Address</label>
            <Field id="address" name="address" type="text" />
            <ErrorMessage component="p" name="address" />
          </div>
          <div className="formik-item">
            <label htmlFor="city">City</label>
            <Field id="city" name="city" type="text" />
            <ErrorMessage component="p" name="city" />
          </div>
          <div className="formik-item">
            <label htmlFor="pincode">Pincode</label>
            <Field id="pincode" name="pincode" type="text" />
            <ErrorMessage component="p" name="pincode" />
          </div>
          <div className="formik-item">
            <label htmlFor="avatar">Image url</label>
            <Field id="avatar" name="avatar" type="text" />
            <ErrorMessage component="p" name="avatar" />
          </div>
          <div>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Forms;
