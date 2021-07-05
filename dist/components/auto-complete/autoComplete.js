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
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Icon from '../icons/icon';
import Input from '../inputs/input';
import { scopedClass } from '../../utils/scopedClass';
import Transition from '../transitions/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
var sc = scopedClass('chocolate-suggest');
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, value = props.value, onSelect = props.onSelect, width = props.width, style = props.style, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "value", "onSelect", "width", "style", "renderOption"]);
    var _a = useState([]), suggestions = _a[0], setSuggestions = _a[1];
    var _b = useState(value), inputValue = _b[0], setInputValue = _b[1];
    var _c = useState(false), showDropdown = _c[0], setShowDropdown = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 300);
    useClickOutside(componentRef, function () { setSuggestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            setSuggestions([]);
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    data && setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                setShowDropdown(true);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    var handleOnChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleOnKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelectItem(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var handleSelectItem = function (item) {
        setInputValue(item.value);
        onSelect && onSelect(item);
        setShowDropdown(false);
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var renderSuggestions = function () {
        var _a = restProps.size, size = _a === void 0 ? '' : _a;
        return (React.createElement(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () { setSuggestions([]); } },
            React.createElement("ul", { className: sc('list'), style: { width: width + "px" } },
                loading &&
                    React.createElement("div", { className: "suggestions-loading-icon" },
                        React.createElement(Icon, { icon: "spinner", spin: true })),
                suggestions && suggestions.map(function (item, index) {
                    var classnames = classNames(sc('list-item'), {
                        'list-item-sm': size !== 'lg',
                        'list-item-lg': size !== 'sm',
                        'is-active': index === highlightIndex
                    });
                    return (React.createElement("li", { key: index, className: classnames, onClick: function () { return handleSelectItem(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: 'chocolate-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ style: __assign({ width: width + "px" }, style), value: inputValue, onKeyDown: handleOnKeyDown, onChange: handleOnChange }, restProps)),
        renderSuggestions()));
};
AutoComplete.defaultProps = {
    width: 300
};
export default AutoComplete;
