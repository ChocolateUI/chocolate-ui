import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon, { ThemeProps } from "../Icon/icon";

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link" | "ghost";

export interface BaseButtonProps {
  /**
   * 设置按钮额外的样式
   */
  className?: string;
  /**
   * 设置按钮是否可用
   */
  disabled?: boolean;
  /**
   * 设置按钮大小
   */
  size?: ButtonSize;
  /**
   * 设置按钮类型
   */
  btnType?: ButtonType;
  children: React.ReactNode;
  /**
   * 设置 link 类型按钮的跳转链接
   */
  href?: string;
  /**
   * 添加图标到标题后
   */
  icon?: IconProp;
  /**
   * 图标主题
   */
  theme?: ThemeProps;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
// export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'chocolate-ui'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    icon,
    theme,
    ...restProps
  } = props;

  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {icon ? (
          <Icon icon={icon} theme={theme} style={{ marginRight: 5 }} />
        ) : null}
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  className: "",
  disabled: false,
  size: "sm",
  btnType: "default",
  href: "http://www.baidu.com",
};

export default Button;
