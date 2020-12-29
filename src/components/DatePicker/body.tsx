/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from 'react'
import DayJs from 'dayjs'
import classNames from 'classnames'
import WEEK_DAYS from './utils/title';
import { isSameDay, isDayBefore, isDayAfter, dateDisabled, checkInRange } from './utils/timer';

interface BodyProps {
  defaultValue?: any;
  range: boolean;
  itemRender: boolean;
  ranges: any;
  isAnimating: boolean;
}

const labelKeys = Object.values(WEEK_DAYS);

const getAllDays = (currDate: any) => {
  const currMonth = DayJs(currDate).startOf('month');
  const prevMonthDays = getMonthDays(currMonth.clone().subtract(1, 'months'));
  const currMonthDays = getMonthDays(currMonth);
  const nextMonthDays = getMonthDays(currMonth.clone().add(1, 'months'));
  return [prevMonthDays, currMonthDays, nextMonthDays];
}

const getMonthDays = (startOfMonth: any) => {
  const daysInMonth = startOfMonth.daysInMonth(); // total num in month
  const startNum = startOfMonth.day(); // the first weekday
  const nextMonth = startOfMonth.clone().add(1, 'month');
  const prevMonthDays = renderPrevMonthDays(startOfMonth, startNum);
  const currMonthDays = renderCurrMonthDays(startOfMonth, daysInMonth);
  const nextMonthDays = renderNextMonthDays(nextMonth.startOf('month'), 42 - prevMonthDays.length - currMonthDays.length);
  return {
    [startOfMonth.format('YYYYMMDD')]: [
      ...prevMonthDays,
      ...currMonthDays,
      ...nextMonthDays,
    ],
  };
}

/**
* render last month
*/
const renderPrevMonthDays = (firstDay, count) => {
  const emptyDays = [];
  let start = DayJs(firstDay).clone().subtract(count, 'days');
  const i = -1;
  while (count--) {
    emptyDays.push(
      {
        num: start.format('D'),
        date: null,
        key: start.format('YYYYMMDD'),
        inMonth: false,
        isDisable: true,
      },
    );
    start = DayJs(firstDay).clone().subtract(count, 'days');
  }
  return emptyDays;
}

/**
  * render current month
  */
const renderCurrMonthDays = (firstDay, count) => {
  const realDays = [];
  let i = 1;
  while (count--) {
    const date = DayJs(firstDay).clone().add(i - 1, 'days');
    realDays.push(
      {
        num: i,
        active: false,
        date,
        connect: false,
        isStart: false,
        isEnd: false,
        isDisable: false,
        key: date.format('YYYYMMDD'),
        inMonth: true,
      },
    );
    i++;
  }
  return realDays;
}

/**
* render next month empty days
* @param {*} start
* @param {*} count
*/
const renderNextMonthDays = (start, count) => {
  const emptyDays = [];
  let i = 1;
  while (count--) {
    emptyDays.push(
      {
        num: start.format('D'),
        date: null,
        start,
        key: start.format('YYYYMMDD'),
        inMonth: false,
        isDisable: true,
      },
    );
    start = DayJs(start).clone().add(1, 'd');
    i += 1;
  }
  return emptyDays;
}

const Body: FC<BodyProps> = (props) => {
  const { defaultValue, isAnimating, bodyWidth, itemClass, itemRender, range, selectable, startDate,
    endDate, minDate,ranges,
    maxDate, disabledDates =[] } = props;

  const [allDays, setAllDays] = useState(getAllDays(defaultValue))
  const [movePrev, setMovePrev] = useState(false)
  const [moveNext, setMoveNext] = useState(false)
  const renderRowDays = (days: []) => days.map((item) => {
    const typeOfItemClass = typeof itemClass;
    let itemClassStr = '';
    if (typeOfItemClass === 'function') {
      itemClassStr = itemClass(item) || '';
    }
    if (typeOfItemClass === 'string') {
      itemClassStr = itemClass;
    }
    const commonCls = classNames({
      'rdp__days-item--grey': item.isDisable,
      'rdp__days-item--empty': !item.inMonth,
      'rdp__days-item': true,
      [itemClassStr]: !!itemClassStr,
    });

    let alternativeCls = '';
    if (range) {
      alternativeCls = classNames({
        'rdb__days-item-active--connect': item.connect,
        'rdp__days-item-active--start': item.isStart && selectable,
        'rdp__days-item-active--end': item.isEnd,
        'rdp__days-item-active--single': !endDate && item.isStart && !range && selectable,
        'rdp__days-item-active--range-start': item.isRangeStart || item.isRangeAdjacent,
        'rdp__days-item-active--range-end': item.isRangeEnd || item.isRangeAdjacent,
        'rdp__days-item-active--range-connect': item.isInRange && (!item.isRangeStart && !item.isRangeEnd),
      });
    } else {
      alternativeCls = classNames({
        'rdp__days-item-active--single': item.active,
      });
    }

    const allowDownEvent = !item.isDisable && item.inMonth && selectable;
    const allowHoverEvent = range && item.inMonth && !item.isDisable;

    return (
      <div
        className={`${commonCls} ${alternativeCls}`}
        key={item.key}
        data-label={item.dayStr}
        data-key={item.key}
      // onClick={() => handleClick(item.date)}
      // onMouseDown={() => allowDownEvent && handleMouseDown(item.date)}
      // onMouseEnter={() => allowHoverEvent && handleMouseEnter(item.date)}
      >
        { itemRender ? itemRender(item) : item.num}
      </div>
    );
  });

  const renderDays = (days: []) => {
    const rowArray = [];
    let arr = [];
    days.forEach((item: any, idx: number) => {
      console.log('item: ', item);
      if (item.date) { // only handle item has date
        // if (ranges && checkInRange(ranges)) {
        //   const checkRangeRet = checkInRange(item.date);
        //   item.isRangeStart = checkRangeRet.isRangeStart;
        //   item.isInRange = checkRangeRet.isInRange;
        //   item.isRangeEnd = checkRangeRet.isRangeEnd;
        //   item.isRangeAdjacent = checkRangeRet.isRangeAdjacent;
        // }
        item.isDisable = isDayBefore(item.date, minDate) || isDayAfter(item.date, maxDate) || dateDisabled(disabledDates, item.date);
        if (range) {
          if (startDate && endDate) {
            item.isStart = isSameDay(startDate, item.date);
            item.isEnd = isSameDay(endDate, item.date);
            item.active = isSameDay(startDate, item.date) || isSameDay(endDate, item.date);
            item.connect = isDayAfter(item.date, startDate) && isDayBefore(item.date, endDate);
          } else {
            item.isStart = isSameDay(startDate, item.date);
            item.active = isSameDay(startDate, item.date);
            item.isEnd = isSameDay(endDate, item.date);
            item.connect = false;
          }
        } else {
          item.active = isSameDay(defaultValue, item.date);
        }
      } else {
        item.active = false;
      }
      if (idx > 0 && idx % 7 === 0) {
        // new row
        rowArray.push(arr);
        arr = [];
      }
      arr.push(item);
    });

    // last row
    if (arr.length) {
      rowArray.push(arr);
    }
    return rowArray.map((rowDays, idx) => (
      <div className="rdp__days-row" key={idx}>
        { renderRowDays(rowDays)}
      </div>
    ));
  };

  const renderAllDays = () => allDays.map((pageDays, idx) => {
    // base on key format is { YYYYMMDD }
    const key = Object.keys(pageDays)[0];
    const cls = classNames({
      rdp__view: true,
      'rdp--hidden': !isAnimating && idx !== 1, // the middle is visible
    })
    return (
      <div className={cls} key={key}>
        { renderDays(pageDays[key])}
      </div>
    )
  })



  const cls = classNames({
    'rdp__animation-left': isAnimating && moveNext,
    'rdp__animation-right': isAnimating && movePrev,
    rdp__body: true,
  })

  let translateX = 0;
  if (movePrev) {
    translateX = bodyWidth;
  }
  if (moveNext) {
    translateX = -bodyWidth;
  }

  const bodyStyle = {
    width: bodyWidth * 3,
    left: -bodyWidth,
    transform: isAnimating && `translateX(${translateX}px)`,
  };

  return (
    <div>
      <div className="rdp__labels">
        {
          labelKeys.map((item, idx) => (
            <div className="rdp__labels-item" key={item}>
              {item}
            </div>
          ))
        }
      </div>
      <div className={cls} style={bodyStyle} >
        {renderAllDays(allDays)}
      </div>
    </div>
  )
}

export default Body;