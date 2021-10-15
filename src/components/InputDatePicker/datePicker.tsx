import React, { FC, ChangeEvent, useMemo } from "react";
import classNames from "classnames";
import { scopedClass } from "../../utils/scopedClass";
import buildWeeks, { buildDayNames } from "./utils/generator";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import isSameDay from "date-fns/isSameDay";
import dateFnsIsToday from "date-fns/isToday";
import { Button } from "../Button/button";
import { CalendarProps } from "./calendar";

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

export const DatePicker: FC<DatePickerProps & CalendarProps> = (props) => {
  const {
    calendar: { year, monthIndex },
    selectedDate,
    onSelectDate,
  } = props;

  const weeks = useMemo(() => buildWeeks(year, monthIndex), [monthIndex, year]);
  const dayNames = useMemo(() => buildDayNames(0), []);
  const exchangeDayNames = (name: string) => {
    switch (name) {
      case "7":
        return "日";
      case "1":
        return "一";
      case "2":
        return "二";
      case "3":
        return "三";
      case "4":
        return "四";
      case "5":
        return "五";
      case "6":
        return "六";
      default:
        break;
    }
  };
  return (
    <table className={classNames(sc("wrapper"))}>
      <thead className={classNames(sc("header"))}>
        <tr>
          {dayNames.map((dayName, i) => (
            <th key={i}>{exchangeDayNames(dayName)}</th>
          ))}
        </tr>
      </thead>

      <tbody className={classNames("weeks")}>
        {weeks.map((week: [], i: number) => (
          <tr key={i} className={classNames(sc("weeks-item"))}>
            {week.map((day: Date, j: number) => {
              // 目前是当前日期
              const isToday = dateFnsIsToday(day);
              // 当前月日期
              const isCurrentMonth = getMonth(day) === monthIndex;
              // 选中日期
              const isSelected = isSameDay(day, selectedDate);
              return (
                <td key={j} className={classNames(sc("day"))}>
                  <Button
                    className={classNames(sc("ghost"), {
                      [`${sc("is-today")}`]: isToday,
                      [`${sc("is-selected")}`]: isSelected,
                      [`${sc("is-current-month")}`]: !isCurrentMonth,
                    })}
                    btnType="ghost"
                    onClick={(e) =>
                      onSelectDate(
                        (e as unknown) as ChangeEvent<HTMLInputElement>,
                        day
                      )
                    }
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
