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

  // tabIndex 使 div 可以聚焦，从而可以使用 onFocus/onBlur
  return (
    <FocusManager onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
      <DateManager onChange={props.onChange}>
        <InputComponent />
        {/* {showPicker && <Picker />} */}
        {<Picker />}
      </DateManager>
    </FocusManager>
  );
};

export default InputDatePicker;
