import React from "react";
import scopedClass from "../../utils/scopedClass";
import { Button } from "../Button/button";
import { buildMonths } from "./utils/generator";
import classNames from "classnames";
const sc = scopedClass("chocolate-picker-month");

export interface MonthOfYear {
  index: number;
  name: string;
}

interface MonthPickerProps {
  selectedMonthIndex: number;
  onSelect: (value: number) => void;
}

function MonthPicker(props: MonthPickerProps) {
  const months: MonthOfYear[][] = buildMonths();
  const { selectedMonthIndex, onSelect } = props;
  return (
    <table className={sc("wrapper")}>
      {months.map((row: MonthOfYear[], i: number) => (
        <tr key={i}>
          {row.map((month: MonthOfYear, j: number) => {
            const isSelected = month.index === selectedMonthIndex;
            return (
              <td className={sc("cell")} key={j}>
                <Button
                  className={classNames(sc("ghost"), {
                    [`${sc("is-selected")}`]: isSelected,
                  })}
                  btnType="ghost"
                  onClick={() => onSelect && onSelect(month.index)}
                >
                  {month.name}
                </Button>
              </td>
            );
          })}
        </tr>
      ))}
    </table>
  );
}

export default MonthPicker;
