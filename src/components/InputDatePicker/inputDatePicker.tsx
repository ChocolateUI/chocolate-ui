import React, { FC, useState } from "react";
import FocusManager from "../../utils/focusManager";
import DateManager from "./dateManager";
import InputComponent from "./input";
import Picker from "./picker";

export interface InputDatePickerProps {
  onChange?: () => void;
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
      <DateManager onChange={props.onChange}>
        <InputComponent />
        {showPicker && <Picker />}
      </DateManager>
    </FocusManager>
  );
};
InputDatePicker.defaultProps = {};

export default InputDatePicker;
