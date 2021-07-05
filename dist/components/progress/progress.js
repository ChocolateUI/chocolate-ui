import React from 'react';
import { scopedClass } from '../../utils/scopedClass';
var sc = scopedClass('chocolate-progress');
var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: "chocolate-progress", style: styles },
        React.createElement("div", { className: sc("bar-outer"), style: { height: strokeHeight + "px" } },
            React.createElement("div", { className: sc("bar-inner") + " color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: sc('bar-inner-text') }, percent + "%")))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};
export default Progress;
