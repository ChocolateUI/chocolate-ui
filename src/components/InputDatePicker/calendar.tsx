import React, { useState } from "react";
import DateView from "./dateView";
import MonthYearView from "./monthYearView";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";

function Calendar() {
  const [isDateView, setDateView] = useState(false);
  const today = new Date();
  const initialCalendar = {
    year: getYear(today),
    monthIndex: getMonth(today),
  };
  const [calendar, setCalendar] = useState(initialCalendar);
  function onSelectMonth (selectedMonthIndex: number) {
    setCalendar({...calendar, monthIndex: selectedMonthIndex})
  }
  const onSetMonthYearView = setDateView.bind(null, false);
  const onSetDateView = setDateView.bind(null, true);

  return (
    <div className="chocolate-picker">
      {isDateView ? (
        <DateView calendar={calendar} onSelectMonthYear={setCalendar} onTitleClick={onSetMonthYearView} />
      ) : (
        <MonthYearView calendar={calendar} onSelectMonth={onSelectMonth} onBackClick={onSetDateView}/>
      )}
    </div>
  );
}

export default Calendar;
