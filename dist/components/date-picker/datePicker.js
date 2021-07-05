import React, { useState, useRef, useEffect } from 'react';
import Header from './header';
import Body from './body';
import DayJs from 'dayjs';
var DatePicker = function (props) {
    var _a = useState(DayJs), date = _a[0], setDate = _a[1];
    var _b = useState(0), containerWidth = _b[0], setContainerWidth = _b[1];
    var _c = useState(false), animating = _c[0], setAnimating = _c[1];
    var componentRef = useRef(null);
    var onPrevClick = function () {
        var preMonth = date.subtract(1, 'month');
        setDate(preMonth);
        setAnimating(true);
    };
    var onNextClick = function () {
        var nextMonth = date.add(1, 'month');
        setDate(nextMonth);
        setAnimating(true);
    };
    useEffect(function () {
        var resizeHandle = function () {
            if (componentRef) {
                setContainerWidth(componentRef.current['offsetWidth']);
            }
        };
        window.addEventListener('resize', resizeHandle);
        setContainerWidth(componentRef.current['offsetWidth']);
    }, []);
    return (React.createElement("div", { className: "rdp__container", ref: componentRef },
        React.createElement(Header, { onPrevClick: onPrevClick, onNextClick: onNextClick, date: date }),
        React.createElement(Body, { defaultValue: date, selectable: true, range: false, itemRender: false, isAnimating: animating, animateEnd: function () { return setAnimating(false); }, bodyWidth: containerWidth, date: date, ranges: [[DayJs().add(8, 'day'), DayJs().add(12, 'day')], [DayJs(), DayJs().add(8, 'day')]] })));
};
export default DatePicker;
