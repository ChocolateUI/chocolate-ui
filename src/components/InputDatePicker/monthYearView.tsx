import React, { MouseEvent, MouseEventHandler } from "react";
import MonthPicker from "./monthPicker";
import ViewLayout from "./viewLayout";
import { Button } from "../Button/button";
import Icon from "../Icons_";
import { CalendarType } from "./datePicker";
import HeaderTitle from "./headerTitle";

interface DateViewProps {
  calendar: CalendarType;
  onSelectMonth: (value: number) => void;
  onSelectYear: (value: number) => void;
  onBackClick: MouseEventHandler<SVGSVGElement>;
  onClickToday: (e: MouseEvent<HTMLElement>) => void;
}

function MonthYearView(props: DateViewProps) {
  const {
    calendar,
    onSelectMonth,
    onBackClick,
    onSelectYear,
    onClickToday,
  } = props;
  const { monthIndex } = calendar;
  return (
    <ViewLayout
      header={{
        leftElement: <Icon icon="angle-left" onClick={onBackClick} />,
        middleElement: (
          <HeaderTitle {...calendar} onSelectYear={onSelectYear} />
        ),
        rightElement: <div />,
      }}
      bodyElement={
        <MonthPicker selectedMonthIndex={monthIndex} onSelect={onSelectMonth} />
      }
      footerElement={
        <Button btnType="ghost" onClick={onClickToday}>
          今天
        </Button>
      }
    />
  );
}

export default MonthYearView;
