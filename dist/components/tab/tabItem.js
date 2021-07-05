import React from 'react';
var TabItem = function (props) {
    var children = props.children;
    return (React.createElement(React.Fragment, null, children));
};
TabItem.displayName = 'TabItem';
export default TabItem;
