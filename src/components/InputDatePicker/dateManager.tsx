import React, { ChangeEvent, createContext, useState } from "react";
import { dateToStr } from "./utils/date-extraction";

interface DateManagerState {
  date: Date;
  textInput: string;
}

interface DateManagerProps {
  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    value: DateManagerState
  ) => void;
  children: React.ReactNode;
}

export interface IPickerContext {
  value: DateManagerState;
  onSelectDate: (e: ChangeEvent<HTMLInputElement>, date: Date) => void;
}
export const DateContext = createContext<IPickerContext>({
  value: { date: new Date(), textInput: "" },
  onSelectDate: () => {},
});

function DateManager(props: DateManagerProps) {
  const { onChange, children } = props;
  const [state, setState] = useState<DateManagerState>({
    date: new Date(),
    textInput: "",
  });

  function onSelectDate(e: ChangeEvent<HTMLInputElement>, date: Date) {
    const nextState: DateManagerState = {
      date,
      textInput: dateToStr(date),
    };
    setState(nextState);
    onChange && onChange(e, nextState);
  }

  const passedContext: IPickerContext = {
    value: state,
    onSelectDate,
  };

  return (
    <DateContext.Provider value={passedContext}>
      {children}
    </DateContext.Provider>
  );
}

export default DateManager;
