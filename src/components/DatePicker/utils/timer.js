/* eslint-disable no-unused-vars */
import Dayjs from 'dayjs';
import Moment from 'moment'
import { extendMoment } from 'moment-range';

const dayjs = extendMoment(Moment);

/**
 * check date in ranges
 * @param ranges
 * @returns {Function}
 */
export function checkInRange(ranges) {
  const sortRet = ranges.sort((a, b) => a[0].diff(b[0]));
  // range by YYYY-MM-DD 00:00:00
  const mRanges = sortRet.map((r) => (dayjs.range.apply(null, r.map((date) => dayjs(date).format('YYYY-MM-DD')))));
  return function (date) {
    const inRange = mRanges.find((range) => range.contains(date));
    let isAdjacent = false;
    if (mRanges.length > 1) {
      for (let i = 1; i < mRanges.length; i++) {
        const prev = mRanges[i - 1];
        const curr = mRanges[i];
        if (prev.overlaps(curr, { adjacent: true }) && isSameDay(prev.end, date)) {
          isAdjacent = true;
          break;
        }
      }
    }
    return {
      isInRange: !!inRange,
      isRangeAdjacent: isAdjacent,
      isRangeStart: Boolean(inRange && isSameDay(inRange.start, date)),
      isRangeEnd: Boolean(inRange && isSameDay(inRange.end, date)),
    };
  };
}

/**
 * check if same day
 * @param {*} a  dayjs object
 * @param {*} b  dayjs object
 */
export function isSameDay(a, b) {
  return Boolean(a && b && dayjs(a).isSame(dayjs(b), 'day'));
}

/**
 * check if same default props
 * @param {*} a
 * @param {*} b
 */
export function isSameDays(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length; i++) {
      if (!isSameDay(a[i], b[i])) {
        return false;
      }
      return true;
    }
  } else {
    return isSameDay(a, b);
  }
}

/**
 *
 * @param {*} start
 * @param {*} end
 */
export function isDayBefore(start, end) {
  return Boolean(start && end && start.isBefore(end, 'day'));
}

/**
 *
 * @param {*} start
 * @param {*} end
 */
export function isDayAfter(start, end) {
  return Boolean(start && end && start.isAfter(end, 'day'));
}

/**
 *
 * @param {*} start
 * @param {*} end
 */
export function isMonthAfter(start, end) {
  return Boolean(start && end && start.isAfter(end, 'month'));
}

/**
 *
 * @param {*} start
 * @param {*} end
 */
export function isMonthBefore(start, end) {
  return Boolean(start && end && start.isBefore(end, 'month'));
}

/**
 * is same month
 * @param {*} start
 * @param {*} end
 */
export function isSameMonth(start, end) {
  return Boolean(start && end && start.isSame(end, 'month'));
}

/**
 * get the first day of month
 */
export function getFirstDayOfMonth(date) {
  return date && dayjs(date).startOf('month');
}

/**
 * get the last day of month
 * @param {*} date
 */
export function getLastDayOfMonth(date) {
  return date && dayjs(date).endOf('month');
}

/**
 * check if date is in disabled dates
 * @param disabledDates
 * @param date
 * @returns {boolean}
 */
export function dateDisabled(disabledDates, date) {
  return Boolean(~disabledDates.findIndex((item) => isSameDay(item, date)));
}

/**
 * get yesterday
 * @returns {Array}
 */
export function getYesterday() {
  const date = [];
  date.push(dayjs().subtract('days', 1).startOf('day'));
  date.push(dayjs().subtract('days', 1).endOf('day'));
  return date;
}

/**
 * get last 7 days
 * @returns {Array}
 */
export function getLast7Days() {
  const date = [];
  date.push(dayjs().subtract('days', 7).startOf('day'));
  date.push(dayjs().subtract('days', 1).endOf('day'));
  return date;
}

/**
 * get last 30 days
 * @returns {Array}
 */
export function getLast30Days() {
  const date = [];
  date.push(dayjs().subtract('days', 30).startOf('day'));
  date.push(dayjs().subtract('days', 1).endOf('day'));
  return date;
}

/**
 * get last week days
 * @returns {Array}
 */
export function getLastWeekDays() {
  const date = [];
  const weekOfday = parseInt(dayjs().format('d'));
  const start = dayjs().subtract(weekOfday + 7, 'days').startOf('day');
  const end = dayjs().subtract(weekOfday + 1, 'days').endOf('day');
  date.push(start);
  date.push(end);
  return date;
}
