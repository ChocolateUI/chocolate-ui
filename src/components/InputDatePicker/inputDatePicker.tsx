import React, { FC, ChangeEvent } from "react";
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
