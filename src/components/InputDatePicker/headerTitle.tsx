import React from "react";
import { Button } from "../Buttons/button";
import format from "date-fns/format";
import { CalendarType } from "./datePicker";
import YearPicker from "./yearPicker";
import scopedClass from "../../utils/scopedClass";

const sc = scopedClass("chocolate-picker-header-title");
interface subType {
  onTitleClick?: () => void;
  onSelectYear?: (value: number) => void;
}

type NextType = CalendarType & subType;

function HeaderTitle(props: NextType) {
  const { year, monthIndex, onTitleClick, onSelectYear } = props;
  const firstDayOfMonth = new Date(year, monthIndex);
  const monthLabel = format(firstDayOfMonth, "L");
  const yearLabel = format(firstDayOfMonth, "yyyy");

  if (onSelectYear) {
    return (
      <div className={sc("wrapper")}>
        <span>{monthLabel} 月</span>
        <YearPicker
          selectedYear={year}
          defaultValue={`${yearLabel} 年`}
          onSelectYear={onSelectYear}
        />
      </div>
    );
  } else {
    return (
      <Button btnType="ghost" size="sm" onClick={onTitleClick}>
        {`${yearLabel} 年`} {monthLabel} 月
      </Button>
    );
  }
}

export default HeaderTitle;
