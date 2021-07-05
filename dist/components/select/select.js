import React, { useState, createContext, useRef } from 'react';
import classNames from 'classnames';
import Input from '../inputs/input';
import { scopedClass } from '../../utils/scopedClass';
import Transition from '../transitions/transition';
import useClickOutside from '../../hooks/useClickOutside';
var sc = scopedClass('chocolate-select');
export var SelectContext = createContext({ index: '0' });
var Select = function (props) {
    var disabled = props.disabled, children = props.children, onChange = props.onChange, style = props.style, defaultValue = props.defaultValue;
    var _a = useState(false), showOption = _a[0], setShowOption = _a[1];
    var _b = useState(defaultValue), inputValue = _b[0], setInputValue = _b[1];
    var handleClick = function (value) {
        setInputValue(value);
        onChange && onChange(value);
    };
    var handleShowOption = function (value) {
        setShowOption(value);
    };
    var passedContext = {
        onSelect: handleClick,
        onShowOption: handleShowOption,
    };
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () { return setShowOption(false); });
    var renderChildren = function () {
        var classnames = classNames(sc('option-list'));
        return (React.createElement(Transition, { in: showOption, animation: "zoom-in-top", timeout: 300 },
            React.createElement("ul", { className: classnames }, React.Children.map(children, function (child, index) {
                var childElement = child;
                return React.cloneElement(childElement);
            }))));
    };
    return (React.createElement("div", { style: style, className: 'chocolate-select', ref: componentRef },
        React.createElement(SelectContext.Provider, { value: passedContext },
            React.createElement(Input, { onChange: onChange, icon: 'angle-down', disabled: disabled, readOnly: !disabled, onClick: function () { return setShowOption(true); }, value: inputValue }),
            renderChildren())));
};
Select.defaultProps = {
    disabled: false
};
export default Select;
