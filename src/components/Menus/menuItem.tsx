import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon, { ThemeProps } from "../Icon/icon";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /**
   * 添加图标到标题后
   */
  icon?: IconProp;
  /**
   * 图标主题
   */
  theme?: ThemeProps;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children, icon, theme } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {icon ? (
        <Icon icon={icon} theme={theme} style={{ marginRight: 5 }} />
      ) : null}
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";
export default MenuItem;
