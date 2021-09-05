import React, { FC, ChangeEvent, useState } from "react";
import FocusManager from "../../utils/focusManager";
import { Input } from "../inputs/input";
import Calendar from "./calendar";

export interface InputDatePickerProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputDatePicker: FC<InputDatePickerProps> = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const openPicker = setShowPicker.bind(null, true);
  const closePicker = setShowPicker.bind(null, false);
  function onFocus() {
    openPicker();
  }
  function onBlur() {
    closePicker();
  }
  return (
    <FocusManager onFocus={onFocus} onBlur={onBlur}>
      <Input size="sm"/>
      {showPicker && <Calendar />}
    </FocusManager>
  );
};

InputDatePicker.defaultProps = {};

export default InputDatePicker;
