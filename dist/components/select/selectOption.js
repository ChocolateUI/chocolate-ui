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
import React, { useContext } from 'react';
import classNames from 'classnames';
import { scopedClass } from '../../utils/scopedClass';
import { SelectContext } from './select';
var sc = scopedClass('chocolate-select');
var SelectOption = function (props) {
    var value = props.value, children = props.children, restProps = __rest(props, ["value", "children"]);
    var context = useContext(SelectContext);
    var handleOptionItem = function (item) {
        if (!props.disabled) {
            context.onSelect && context.onSelect(item);
            context.onShowOption && context.onShowOption(false);
        }
    };
    var classnames = classNames(sc('option-list-item'), {
        'is-disabled': props.disabled
    });
    return (React.createElement("li", __assign({ className: classnames, onClick: function () { return handleOptionItem(value); } }, restProps), children));
};
export default SelectOption;
