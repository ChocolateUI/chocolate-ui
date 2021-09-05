import React, { MouseEvent, useEffect, useRef, useState } from "react";
import DateView from "./dateView";
import MonthYearView from "./monthYearView";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";
import startOfDay from "date-fns/start_of_day";

export interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (
    e: MouseEvent<HTMLElement>,
    date: Date
  ) => void;
}

function Calendar(props: CalendarProps) {
  const { selectedDate, onSelectDate } = props;
  const [isDateView, setDateView] = useState(false);
  const calendarRef = useRef(null);

  const today = new Date();
  const initialCalendar = {
    year: getYear(today),
    monthIndex: getMonth(today),
  };
  const [calendar, setCalendar] = useState(initialCalendar);

  function onSelectMonth(selectedMonthIndex: number) {
    setCalendar({ ...calendar, monthIndex: selectedMonthIndex });
  }
  function onSelectYear(selectedYear: number) {
    setCalendar({ ...calendar, year: selectedYear });
  }
  const onSetMonthYearView = setDateView.bind(null, false);

  const onSetDateView = setDateView.bind(null, true);

  useEffect(() => {
    // 处理 MonthYearView 展示后聚焦操作
    if (calendarRef) {
      calendarRef.current.focus();
    }
  }, [isDateView]);

  const onClickToday = (e: MouseEvent<HTMLElement>) => {
    onSelectDate(e, startOfDay(new Date()));
  };

  return (
    <div className="chocolate-picker" ref={calendarRef}>
      {isDateView ? (
        <DateView
          calendar={calendar}
          onSelectMonthYear={setCalendar}
          onTitleClick={onSetMonthYearView}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          onClickToday={onClickToday}
        />
      ) : (
        <MonthYearView
          calendar={calendar}
          onSelectMonth={onSelectMonth}
          onBackClick={onSetDateView}
          onSelectYear={onSelectYear}
          onClickToday={onClickToday}
        />
      )}
    </div>
  );
}

export default Calendar;
