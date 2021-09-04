import React, { Dispatch, SetStateAction } from "react";
import { ViewLayout } from "./viewLayout";
import DatePicker, { CalendarType } from "./datePicker";
import { Button } from "../Button/button";
import Icon from "../icons/icon";
import HeaderTitle from "./headerTitle";

interface DateViewProps {
  calendar: CalendarType;
  onSelectMonthYear: Dispatch<
    SetStateAction<{ year: number; monthIndex: number }>
  >;
}

function module(m: number, n: number) {
  return ((m % n) + n) % n;
}
function DateView(props: DateViewProps) {
  const {
    calendar: { year, monthIndex },
    onSelectMonthYear,
  } = props;

  function incrementMonthIndex(increment: number) {
    const incrementedMonthIndex = module(monthIndex + increment, 12);
    const incrementedYear = year + Math.floor((monthIndex + increment) / 12);
    onSelectMonthYear &&
      onSelectMonthYear({
        year: incrementedYear,
        monthIndex: incrementedMonthIndex,
      });
  }
  const goToPreviousMonth = incrementMonthIndex.bind(null, -1);

  const goToNextMonth = incrementMonthIndex.bind(null, 1);

  return (
    <ViewLayout
      bodyElement={
        <DatePicker
          calendar={props.calendar}
          selectedDate={new Date(2021, 8, 5)}
        />
      }
      header={{
        leftElement: <Icon icon="arrow-left" onClick={goToPreviousMonth} />,
        middleElement: (
          <p>
            <HeaderTitle year={year} monthIndex={monthIndex} />
          </p>
        ),
        rightElement: <Icon icon="arrow-right" onClick={goToNextMonth} />,
      }}
      footerElement={<Button btnType="ghost"> today</Button>}
    ></ViewLayout>
  );
}

DateView.propTypes = {};

export default DateView;
