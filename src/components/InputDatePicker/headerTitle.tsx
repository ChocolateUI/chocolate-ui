import React from "react";
import { Button } from "../Button/button";
import format from "date-fns/format";
import { CalendarType, } from "./datePicker";


function HeaderTitle(props: CalendarType) {
  const { year, monthIndex, onTitleClick } = props;
  const firstDayOfMonth = new Date(year, monthIndex);
  const monthLabel = format(firstDayOfMonth, "MMM");
  const yearLabel = format(firstDayOfMonth, "YYYY");

  return (
    <Button btnType="ghost" size="sm" onClick={onTitleClick}>
      {yearLabel} {monthLabel}
    </Button>
  );
}

export default HeaderTitle;
