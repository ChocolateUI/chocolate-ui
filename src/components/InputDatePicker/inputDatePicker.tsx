import React, { FC, ChangeEvent, InputHTMLAttributes, useState } from "react";
import classNames from "classnames";
import { scopedClass } from "../../utils/scopedClass";
import DateView from "./dateView";

export interface InputDatePickerProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputDatePicker: FC<InputDatePickerProps> = (props) => {
  const {} = props;
  return (
    <div className="chocolate-picker">
      <DateView />
    </div>
  );
};

InputDatePicker.defaultProps = {};

export default InputDatePicker;
