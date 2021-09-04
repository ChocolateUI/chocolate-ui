import React, { FC, ChangeEvent, InputHTMLAttributes, useState } from "react";
import classNames from "classnames";
import { scopedClass } from "../../utils/scopedClass";
import Calendar from "./calendar";

export interface InputDatePickerProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputDatePicker: FC<InputDatePickerProps> = (props) => {
  const {} = props;
  return (
    <Calendar />
  );
};

InputDatePicker.defaultProps = {};

export default InputDatePicker;
