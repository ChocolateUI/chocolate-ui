import React, { useContext } from "react";
import { DateContext, IPickerContext } from "./dateManager";
import { Input } from "../inputs/input";

function InputComponent() {
  const { value } = useContext<IPickerContext>(DateContext);
  return <Input size="sm" value={value.textInput} />;
}

export default InputComponent;
