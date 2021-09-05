import React from "react";
import { Button } from "../Button/button";
import format from "date-fns/format";
import { CalendarType } from "./datePicker";
import YearPicker from "./yearPicker";
import scopedClass from "../../utils/scopedClass";

const sc = scopedClass("chocolate-picker-header-title");
function HeaderTitle(props: CalendarType) {
  const { year, monthIndex, onTitleClick, onSelectYear } = props;
  const firstDayOfMonth = new Date(year, monthIndex);
  const monthLabel = format(firstDayOfMonth, "MMM");
  const yearLabel = format(firstDayOfMonth, "YYYY");

  if (onSelectYear) {
    return (
      <div className={sc("wrapper")}>
        <span>{monthLabel}</span>
        <YearPicker
          selectedYear={year}
          defaultValue={yearLabel}
          onSelectYear={onSelectYear}
        />
      </div>
    );
  } else {
    return (
      <Button btnType="ghost" size="sm" onClick={onTitleClick}>
        {yearLabel} {monthLabel}
      </Button>
    );
  }
}

export default HeaderTitle;
