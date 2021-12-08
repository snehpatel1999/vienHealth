/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { ErrorMessage, Field } from "formik";
import { Form } from "react-bootstrap";


type FieldProps = {
 as?: any,
 name: string,
 value?: string,
 label?: string,
 className?: string,
 placeholder?: string,
 type: string,
}

export default ({
  as,
  name,
  value,
  label,
  className,
  type = "text",
  placeholder,
  ...props
}: FieldProps) => {
  return (
    <Form.Group {...props}>
      {label && <Form.Label>{label}</Form.Label>}
      <Field
        as={as}
        type={type}
        name={name}
        value={value}
        className={`form-control mb-3 ${className}`}
        placeholder={placeholder}
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <p className="error-text font-size-12 mt-2 ml-20">{msg}</p>
        )}
      </ErrorMessage>
    </Form.Group>
  );
};
