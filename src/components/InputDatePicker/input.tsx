import React, { useContext, useState } from "react";
import { DateContext, IPickerContext } from "./dateManager";
import { Input } from "../Inputs/input";

function InputComponent() {
  const { value } = useContext<IPickerContext>(DateContext);

  return <Input placeholder="请选择日期" size="sm" value={value.textInput}/>;
}

export default InputComponent;
