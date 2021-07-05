import React, { useState } from 'react';
import classNames from 'classnames';
import { scopedClass } from '../../utils/scopedClass';
var sc = scopedClass('chocolate-tabs');
/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'chocolate-ui'
 * ~~~
 */
var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, type = props.type, children = props.children;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var classes = classNames('chocolate-tabs', className);
    var handleItemClick = function (index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var navClass = classNames(sc('nav'), {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
    });
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, _b = _a.disabled, disabled = _b === void 0 ? false : _b;
            var classes = classNames(sc('nav-item'), {
                'is-active': activeIndex === index,
                'disabled': disabled,
            });
            return (React.createElement("li", { key: "nav-item-" + index, className: classes, onClick: function () { return handleItemClick(index, disabled); } }, label));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: classes },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("div", { className: sc('content') }, renderContent())));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line'
};
export default Tabs;
