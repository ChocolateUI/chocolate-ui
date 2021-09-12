import React, { forwardRef, useContext } from "react";
import { DateContext, IPickerContext } from "./dateManager";
import { Input } from "../Inputs/input";

const InputComponent = 
  forwardRef((props, ref) => {
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
