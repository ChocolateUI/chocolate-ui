import React, { ChangeEvent, useRef, useState } from "react";
import DateView from "./dateView";
import MonthYearView from "./monthYearView";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import startOfDay from "date-fns/startOfDay";

export interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (
    e: ChangeEvent<HTMLInputElement>,
    date: Date
  ) => void;
}

function Calendar(props: CalendarProps) {
  const { selectedDate, onSelectDate } = props;
  const [isDateView, setDateView] = useState(true);
  const calendarRef = useRef<HTMLDivElement>(null);

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
    
  // 处理 MonthYearView 展示后聚焦操作
  // useEffect(() => {
  //   calendarRef.current && calendarRef.current.focus();
  // }, [isDateView]);

  const onClickToday = (e: ChangeEvent<HTMLInputElement>) => {
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
