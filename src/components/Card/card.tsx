import React, { ReactNode, CSSProperties, FC } from "react";
import classnames from "classnames";

export interface CardProps {
  title?: string;
  shadow?: boolean;
  titleOverflowHidden?: boolean;
  actions?: [];
  showShadowWhenHover?: boolean;
  cover?: string;
  loading?: boolean;
  extra?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Card: FC<CardProps> = (props) => {
  const {
    title,
    cover,
    className,
    extra,
    style,
    shadow,
    titleOverflowHidden,
    actions,
    showShadowWhenHover,
    loading,
    children,
    ...attr
  } = props;

  const prefixCls = "chocolate-card";
  return (
    <section
      className={classnames(prefixCls, className, {
        [`${prefixCls}-shadow`]: shadow,
        [`${prefixCls}-hover`]: showShadowWhenHover,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-cover`]: cover,
      })}
      style={style}
      {...attr}
    >
      {(title || extra) && (
        <div className={classnames(`${prefixCls}-header`)}>
          {cover && (
            <div className={classnames(`${prefixCls}-header-cover`)}>
              <img src={cover} alt={title || cover} />
            </div>
          )}
          {title && (
            <div
              className={classnames(`${prefixCls}-header-title`, {
                [`${prefixCls}-overflow-hidden`]: titleOverflowHidden,
              })}
            >
              {title}
            </div>
          )}
          {extra && (
            <div className={classnames(`${prefixCls}-header-extra`)}>
              {extra}
            </div>
          )}
        </div>
      )}
      <div className={classnames(`${prefixCls}-content`)}>{children}</div>
      {actions && actions.length >= 1 && (
        <div className={classnames(`${prefixCls}-actions`)}>
          {actions.map((action, key) => (
            <div key={key} className={classnames(`${prefixCls}-actions-item`)}>
              {action}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Card;
