import React, { forwardRef, useContext } from "react";
import { DateContext, IPickerContext } from "./dateManager";
import { Input } from "../Input/input";

interface Types {
  onClick: (event: Event) => void;
}

const InputComponent = 
  forwardRef((props: Types, ref) => {
    const { value, onInputChange } = useContext<IPickerContext>(DateContext);

    return (
      <Input
        placeholder="请选择日期"
        size="sm"
        value={value.textInput}
        onChange={onInputChange}
        ref={ref}
      />
    );
  });

export default InputComponent;
