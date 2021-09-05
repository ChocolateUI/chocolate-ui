import format from "date-fns/format";
export function dateToStr(date: Date) {
  return format(date, "YYYY-MM-DD");
}
