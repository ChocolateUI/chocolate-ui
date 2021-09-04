import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import MonthPicker from "./monthPicker";
import ViewLayout from "./viewLayout";
import { Button } from "../Button/button";
import Icon from "../icons";
import { CalendarType } from "./datePicker";

interface DateViewProps {
  calendar: CalendarType;
  onSelectMonth: (value: number) => void;
  onBackClick: MouseEventHandler<SVGSVGElement>;
}

function MonthYearView(props: DateViewProps) {
  const { calendar, onSelectMonth, onBackClick} = props;
  const { monthIndex } = calendar;
  return (
    <ViewLayout
      header={{
        leftElement: <Icon icon="arrow-left" onClick={onBackClick} />,
        middleElement: <p>{111}</p>,
        rightElement: <Icon icon="arrow-right" onClick={() => {}} />,
      }}
      bodyElement={
        <MonthPicker selectedMonthIndex={monthIndex} onSelect={onSelectMonth} />
      }
      footerElement={<Button> aaa</Button>}
    />
  );
}

export default MonthYearView;
