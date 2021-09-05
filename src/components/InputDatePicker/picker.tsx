import React, { useContext } from "react";
import { DateContext, IPickerContext } from "./dateManager";
import Calendar from "./calendar";

function Picker() {
  const { value, onSelectDate } = useContext<IPickerContext>(DateContext);
  return <Calendar selectedDate={value.date} onSelectDate={onSelectDate} />;
}

export default Picker;
