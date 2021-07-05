var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import DayJs from 'dayjs';
import classNames from 'classnames';
import WEEK_DAYS from './utils/title';
import { isSameDay, isDayBefore, isDayAfter, dateDisabled } from './utils/timer';
var labelKeys = Object.values(WEEK_DAYS);
var getAllDays = function (currDate) {
    var currMonth = DayJs(currDate).startOf('month');
    var prevMonthDays = getMonthDays(currMonth.clone().subtract(1, 'month'));
    var currMonthDays = getMonthDays(currMonth);
    var nextMonthDays = getMonthDays(currMonth.clone().add(1, 'month'));
    return [prevMonthDays, currMonthDays, nextMonthDays];
};
var getMonthDays = function (startOfMonth) {
    var _a;
    var daysInMonth = startOfMonth.daysInMonth(); // total num in month
    var startNum = startOfMonth.day(); // the first weekday
    var nextMonth = startOfMonth.clone().add(1, 'month');
    var prevMonthDays = renderPrevMonthDays(startOfMonth, startNum);
    var currMonthDays = renderCurrMonthDays(startOfMonth, daysInMonth);
    var nextMonthDays = renderNextMonthDays(nextMonth.startOf('month'), 42 - prevMonthDays.length - currMonthDays.length);
    return _a = {},
        _a[startOfMonth.format('YYYYMMDD')] = __spreadArrays(prevMonthDays, currMonthDays, nextMonthDays),
        _a;
};
/**
* render last month
*/
var renderPrevMonthDays = function (firstDay, count) {
    var emptyDays = [];
    var start = DayJs(firstDay).clone().subtract(count, 'day');
    var i = -1;
    while (count--) {
        emptyDays.push({
            num: start.format('D'),
            date: null,
            key: start.format('YYYYMMDD'),
            inMonth: false,
            isDisable: true,
        });
        start = DayJs(firstDay).clone().subtract(count, 'day');
    }
    return emptyDays;
};
/**
  * render current month
  */
var renderCurrMonthDays = function (firstDay, count) {
    var realDays = [];
    var i = 1;
    while (count--) {
        var date = DayJs(firstDay).clone().add(i - 1, 'day');
        realDays.push({
            num: i,
            active: false,
            date: date,
            connect: false,
            isStart: false,
            isEnd: false,
            isDisable: false,
            key: date.format('YYYYMMDD'),
            inMonth: true,
        });
        i++;
    }
    return realDays;
};
/**
* render next month empty days
* @param {*} start
* @param {*} count
*/
var renderNextMonthDays = function (start, count) {
    var emptyDays = [];
    var i = 1;
    while (count--) {
        emptyDays.push({
            num: start.format('D'),
            date: null,
            start: start,
            key: start.format('YYYYMMDD'),
            inMonth: false,
            isDisable: true,
        });
        start = DayJs(start).clone().add(1, 'd');
        i += 1;
    }
    return emptyDays;
};
var Body = function (props) {
    var defaultValue = props.defaultValue, isAnimating = props.isAnimating, bodyWidth = props.bodyWidth, itemClass = props.itemClass, itemRender = props.itemRender, range = props.range, selectable = props.selectable, startDate = props.startDate, endDate = props.endDate, minDate = props.minDate, ranges = props.ranges, date = props.date, animateEnd = props.animateEnd, maxDate = props.maxDate, _a = props.disabledDates, disabledDates = _a === void 0 ? [] : _a;
    var _b = useState(getAllDays(defaultValue)), allDays = _b[0], setAllDays = _b[1];
    var _c = useState(false), movePrev = _c[0], setMovePrev = _c[1];
    var _d = useState(false), moveNext = _d[0], setMoveNext = _d[1];
    var prevDate = useRef({});
    var _isAnimating = useRef(false);
    var renderRowDays = useCallback(function (days) { return days.map(function (item) {
        var _a;
        var typeOfItemClass = typeof itemClass;
        var itemClassStr = '';
        if (typeOfItemClass === 'function') {
            itemClassStr = itemClass(item) || '';
        }
        if (typeOfItemClass === 'string') {
            itemClassStr = itemClass;
        }
        var commonCls = classNames((_a = {
                'rdp__days-item--grey': item.isDisable,
                'rdp__days-item--empty': !item.inMonth,
                'rdp__days-item': true
            },
            _a[itemClassStr] = !!itemClassStr,
            _a));
        var alternativeCls = '';
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
        }
        else {
            alternativeCls = classNames({
                'rdp__days-item-active--single': item.active,
            });
        }
        var allowDownEvent = !item.isDisable && item.inMonth && selectable;
        var allowHoverEvent = range && item.inMonth && !item.isDisable;
        return (React.createElement("div", { className: commonCls + " " + alternativeCls, key: item.key, "data-label": item.dayStr, "data-key": item.key }, itemRender ? null : item.num));
    }); }, [endDate, itemClass, itemRender, range, selectable]);
    var renderDays = useCallback(function (days) {
        var rowArray = [];
        var arr = [];
        days.forEach(function (item, idx) {
            if (item.date) { // only handle item has date
                item.isDisable = isDayBefore(item.date, minDate) || isDayAfter(item.date, maxDate) || dateDisabled(disabledDates, item.date);
                if (range) {
                    if (startDate && endDate) {
                        item.isStart = isSameDay(startDate, item.date);
                        item.isEnd = isSameDay(endDate, item.date);
                        item.active = isSameDay(startDate, item.date) || isSameDay(endDate, item.date);
                        item.connect = isDayAfter(item.date, startDate) && isDayBefore(item.date, endDate);
                    }
                    else {
                        item.isStart = isSameDay(startDate, item.date);
                        item.active = isSameDay(startDate, item.date);
                        item.isEnd = isSameDay(endDate, item.date);
                        item.connect = false;
                    }
                }
                else {
                    item.active = isSameDay(defaultValue, item.date);
                }
            }
            else {
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
        return rowArray.map(function (rowDays, idx) { return (React.createElement("div", { className: "rdp__days-row", key: idx }, renderRowDays(rowDays))); });
    }, [defaultValue, disabledDates, endDate, maxDate, minDate, range, renderRowDays, startDate]);
    var renderAllDays = useCallback(function (val) { return allDays.map(function (pageDays, idx) {
        // base on key format is { YYYYMMDD }
        var key = Object.keys(pageDays)[0];
        var cls = classNames({
            rdp__view: true,
            'rdp--hidden': !isAnimating && idx !== 1,
        });
        return (React.createElement("div", { className: cls, key: key }, renderDays(pageDays[key])));
    }); }, [allDays, isAnimating, renderDays]);
    var cls = classNames({
        'rdp__animation-left': isAnimating && moveNext,
        'rdp__animation-right': isAnimating && movePrev,
        rdp__body: true,
    });
    var translateX = 0;
    if (movePrev) {
        translateX = bodyWidth;
    }
    if (moveNext) {
        translateX = -bodyWidth;
    }
    var bodyStyle = {
        width: bodyWidth * 3,
        left: -bodyWidth,
        transform: (isAnimating && "translateX(" + translateX + "px)"),
    };
    useEffect(function () {
        _isAnimating.current = isAnimating;
    }, [isAnimating]);
    useEffect(function () {
        // if (!isSameDay(date, prevDate.current)) {
        if (isDayBefore(date, prevDate.current)) {
            // prev
            setMovePrev(true);
            setMoveNext(false);
        }
        if (isDayAfter(date, prevDate.current)) {
            // next
            setMovePrev(false);
            setMoveNext(true);
        }
        if (!isAnimating) {
            setAllDays(getAllDays(date));
        }
        // }
    }, [date, isAnimating]);
    useEffect(function () {
        prevDate.current = date;
    }, [date, isAnimating]);
    var transitionEndHandle = function (e) {
        if (e.propertyName === 'transform') {
            var _allDays = getAllDays(date);
            var currAllDays = allDays;
            if (movePrev) {
                currAllDays.pop();
                currAllDays.unshift(_allDays.shift() || {});
            }
            if (moveNext) {
                currAllDays.shift();
                currAllDays.push(_allDays.pop() || {});
            }
            setMoveNext(false);
            setMovePrev(false);
            setAllDays(currAllDays);
            animateEnd();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "rdp__labels" }, labelKeys.map(function (item, idx) { return (React.createElement("div", { className: "rdp__labels-item", key: idx }, item)); })),
        React.createElement("div", { className: cls, style: bodyStyle, onTransitionEnd: transitionEndHandle }, renderAllDays(allDays))));
};
export default Body;
