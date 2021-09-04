import React, { useState } from "react";
import DateView from "./dateView";
import MonthYearView from "./monthYearView";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";

function Calendar() {
  const [isDateView, setDateView] = useState(true);
  const today = new Date();
  const initialCalendar = {
    year: getYear(today),
    monthIndex: getMonth(today),
  };
  const [calendar, setCalendar] = useState(initialCalendar);
  return (
    <div className="chocolate-picker">
      {isDateView ? <DateView calendar={calendar} onSelectMonthYear={setCalendar}/> : <MonthYearView />}
    </div>
  );
}

export default Calendar;
