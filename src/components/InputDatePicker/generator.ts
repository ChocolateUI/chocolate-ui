import chunk from "lodash/chunk";
import startOfWeek from "date-fns/start_of_week";
import addDays from "date-fns/add_days";
import setDay from "date-fns/set_day";
import format from "date-fns/format";

export default function buildWeeks(year: number, monthIndex: number) {
  const firstDayOfMonth = new Date(year, monthIndex);
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
  const weeks = new Array(6 * 7)
    .fill(0)
    .map((_, i) => addDays(firstDayOfCalendar, i));
  return chunk(weeks, 7);
}

export function buildDayNames(weekStartsOn: number): string[] {
  return new Array(7)
    .fill(0)
    .map((_, i) => (i + weekStartsOn) % 7)
    .map((dayOfWeek) => {
      const day = setDay(new Date(0), dayOfWeek);
      return format(day, "ddd");
    });
}
