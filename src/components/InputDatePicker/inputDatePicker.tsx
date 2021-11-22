import React, { ChangeEvent, FC, useRef, useState } from "react";
import FocusManager from "../../utils/FocusManagers";
import DateManager from "./dateManager";
import InputComponent from "./input";
import Picker from "./picker";
// import keycode from "keycode";

export interface InputDatePickerProps {
  onChange?: (e: ChangeEvent<Element>, payload: any) => void;
}

export const InputDatePicker: FC<InputDatePickerProps> = (props) => {
  const { onChange } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [showPicker, setShowPicker] = useState(false);
  const openPicker = setShowPicker.bind(null, true);
  const closePicker = setShowPicker.bind(null, false);

  function onFocus() {
    openPicker();
  }

  function onBlur() {
    closePicker();
  }

  function handleOnChange(e: ChangeEvent<Element>, payload: any) {
    onChange && onChange(e, payload);
    console.log('payload: ', payload);
    if (payload.origin === "PICKER") {
      // TODO: 未获取到 ref
      ref.current && ref.current.focus();
      closePicker();
    }
  }

  function onClick() {
    openPicker();
  }

  // TODO: esc 关闭
  // function onKeyDown(e: KeyboardEvent) {
    // switch (e.keyCode) {
    //   case keycode.codes.esc:
    //     if (showPicker) {
    //       if (ref.current) {
    //         ref.current.focus();
    //       }
    //       closePicker();
    //     }
    //     break;

    //   default:
    //     break;
    // }
  // }

  // tabIndex 使 div 可以聚焦，从而可以使用 onFocus/onBlur
  return (
    <FocusManager
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
      // onKeyDown={onKeyDown}
    >
      <DateManager onChange={handleOnChange}>
        <InputComponent ref={ref} onClick={onClick} />
        {showPicker && <Picker />}
      </DateManager>
    </FocusManager>
  );
};

export default InputDatePicker;
