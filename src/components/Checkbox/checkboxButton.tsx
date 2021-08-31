import React from "react";
import CheckboxComponent, { CheckboxProps } from "./checkbox";

export const CheckboxButton = (props: CheckboxProps) => {
  return <CheckboxComponent {...props} />;
};

export default CheckboxButton;