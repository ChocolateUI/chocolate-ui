import React, { ChangeEvent, createContext, useState } from "react";
import { dateToStr, strToDate } from "./utils/date-extraction";

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
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const DateContext = createContext<IPickerContext>({
  value: { date: new Date(), textInput: "" },
  onSelectDate: () => {},
  onInputChange: () => {},
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

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const textInput = e.target.value;
    let errors = [];
    let date = new Date();
    if (textInput) {
      try {
        date = strToDate(textInput);
      } catch (parseErrors) {
        errors = parseErrors;
      }
    }
    const nextState: DateManagerState = {
      date,
      textInput,
    };
    setState(nextState);
    // 调用外部的onChange函数
    onChange && onChange(e, { ...nextState, errors });
  }

  const passedContext: IPickerContext = {
    value: state,
    onSelectDate,
    onInputChange,
  };

  return (
    <DateContext.Provider value={passedContext}>
      {children}
    </DateContext.Provider>
  );
}

export default DateManager;
