import React from 'react';
import classNames from 'classnames';
var Header = function (props) {
    var onPrevClick = props.onPrevClick, onNextClick = props.onNextClick, date = props.date;
    var prevBtnCls = classNames({
        'date-picker-prev-btn': true,
    });
    var nextBtnCls = classNames({
        'date-picker-next-btn': true,
    });
    var year = date.year();
    var month = date.month() + 1;
    return (React.createElement("div", { className: "date-picker-title" },
        React.createElement("span", { className: prevBtnCls, onClick: onPrevClick },
            React.createElement("svg", { className: "navigate-btn", focusable: "false", viewBox: "0 0 1000 1000" },
                React.createElement("path", { d: "M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z" }))),
        React.createElement("span", { className: "date-picker-title-center" },
            React.createElement("span", null, year + "\u5E74" + month + "\u6708")),
        React.createElement("span", { className: nextBtnCls, onClick: onNextClick },
            React.createElement("svg", { className: "navigate-btn", focusable: "false", viewBox: "0 0 1000 1000" },
                React.createElement("path", { d: "M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" })))));
};
export default Header;
