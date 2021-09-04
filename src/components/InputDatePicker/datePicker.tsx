import React, { FC, ChangeEvent, useMemo, useState } from "react";
import classNames from "classnames";
import { scopedClass } from "../../utils/scopedClass";
import buildWeeks, { buildDayNames } from "./generator";
import getDate from "date-fns/get_date";
import getMonth from "date-fns/get_month";
import isSameDay from "date-fns/is_same_day";
import dateFnsIsToday from "date-fns/is_today";
import { Button } from "../Button/button";

const sc = scopedClass("chocolate-picker");

export interface CalendarType {
  year: number;
  monthIndex: number;
}
export interface DatePickerProps {
  calendar: CalendarType;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  selectedDate: Date;
}

export const DatePicker: FC<DatePickerProps> = (props) => {
  const {
    calendar: { year, monthIndex },
    className,
    selectedDate,
  } = props;

  const weeks = useMemo(() => buildWeeks(year, monthIndex), [monthIndex, year]);
  const dayNames = useMemo(() => buildDayNames(0), []);
  return (
    <table className={classNames(sc("wrapper"))}>
      <thead className={classNames(sc("header"))}>
        {dayNames.map((dayName, i) => (
          <th key={i}>{dayName}</th>
        ))}
      </thead>

      <tbody className={classNames("weeks")}>
        {weeks.map((week: [], i: number) => (
          <tr key={i} className={classNames(sc("weeks-item"))}>
            {week.map((day: number, j: number) => {
              // 目前是当前日期
              const isToday = dateFnsIsToday(day);
              // 当前月日期
              const isCurrentMonth = getMonth(day) === monthIndex;
              // 选中日期  
              const isSelected = isSameDay(day, selectedDate);
              return (
                <td key={j} className={classNames(sc("day"), {})}>
                  <Button
                    className={classNames(sc("ghost"), {
                      [`${sc("is-today")}`]: isToday,
                      [`${sc("is-selected")}`]: isSelected,
                      [`${sc("is-current-month")}`]: !isCurrentMonth,
                    })}
                    btnType="ghost"
                  >
                    {getDate(day)}
                  </Button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

DatePicker.defaultProps = {
  calendar: { year: 1799, monthIndex: 8 },
  selectedDate: new Date(),
};

export default DatePicker;
