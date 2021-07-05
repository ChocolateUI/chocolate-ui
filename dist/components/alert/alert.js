var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState } from 'react';
import classNames from 'classnames';
export var Alert = function (props) {
    var _a;
    var className = props.className, message = props.message, description = props.description, closable = props.closable, type = props.type, onClose = props.onClose, restProps = __rest(props, ["className", "message", "description", "closable", "type", "onClose"]);
    var _b = useState(true), visible = _b[0], setVisible = _b[1];
    var classes = classNames('alert-wrapper', className, (_a = {},
        _a["alert-" + type] = type,
        _a['alert-closable'] = true,
        _a));
    var handleClose = function (e) {
        setVisible(false);
        onClose && onClose(e);
    };
    return visible ? (React.createElement(React.Fragment, null,
        React.createElement("div", __assign({ className: classes }, restProps),
            React.createElement("span", { className: description ? "" : "alert-message-normal" }, message),
            description && React.createElement("span", { className: "alert-description" }, description),
            closable && React.createElement("button", { className: "alert-close-icon", onClick: handleClose }, " x ")))) : null;
};
Alert.defaultProps = {
    closable: false,
    type: 'default',
};
export default Alert;
