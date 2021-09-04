import React, {
  FC,
  ChangeEvent,
  InputHTMLAttributes,
  useState,
} from "react";
import classNames from "classnames";
import { scopedClass } from "../../utils/scopedClass";
import { DatePicker } from "./datePicker";

const sc = scopedClass("chocolate-input");

export interface InputDatePickerProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputDatePicker: FC<InputDatePickerProps> = (props) => {
  const {} = props;
  return <DatePicker calendar={{ year: 2021, monthIndex: 8 }} selectedDate={new Date(2021,8,5)}/>;
};

InputDatePicker.defaultProps = {};

export default InputDatePicker;
