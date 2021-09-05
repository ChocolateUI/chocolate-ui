import React, { useEffect, useRef, useState } from "react";
import DateView from "./dateView";
import MonthYearView from "./monthYearView";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";

function Calendar() {
  const [isDateView, setDateView] = useState(true);
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
    if (calendarRef) {
      calendarRef.current.focus();
    }
  }, [isDateView]);

  return (
    <div className="chocolate-picker" ref={calendarRef}>
      {isDateView ? (
        <DateView
          calendar={calendar}
          onSelectMonthYear={setCalendar}
          onTitleClick={onSetMonthYearView}
        />
      ) : (
        <MonthYearView
          calendar={calendar}
          onSelectMonth={onSelectMonth}
          onBackClick={onSetDateView}
          onSelectYear={onSelectYear}
        />
      )}
    </div>
  );
}

export default Calendar;
