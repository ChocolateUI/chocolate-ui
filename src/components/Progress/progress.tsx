import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";
import { scopedClass } from "../../utils/scopedClass";
import classNames from "classnames";
const sc = scopedClass("chocolate-progress");

export interface ProgressProps {
  /**
   * 控制进度条的进度
   */
  percent: number;
  /**
   * 控制进度条的高度
   */
  strokeHeight?: number;
  /**
   * 是否展示进度条提示
   */
  showText?: boolean;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 主题
   */
  theme?: ThemeProps;
  /**
   * 圆形进度条
   */
  circle?: boolean;
  /**
   * 最大值
   */
  max: number;
  className?: string;
  /**
   * 单位
   */
  unit?: string;
  /**
   * 设置圆形进度条的宽度
   */
  width?: number;
  /**
   * 动画效果，条形进度条生效
   */
  animation?: boolean;
}

const prefixCls = "chocolate-progress";
export const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight = 12,
    showText,
    style,
    theme,
    animation,
  } = props;
  const { max, className, unit = "%", width = 0, circle } = props;

  let offset = 0;
  let radius = (width - strokeHeight) / 2;
  let perimeter = 2 * +radius * Math.PI;

  offset = (max - percent) / max;
  const op = offset * perimeter;
  const text = percent <= max ? (percent <= 0 ? 0 : percent) : max;

  const cx = width / 2;
  const cy = width / 2;

  if (circle) {
    return (
      <div
        className={classNames(`${prefixCls}-circle-wrapper`)}
        style={{ ...style, width: width, height: width }}
      >
        <svg
          className={classNames(className, `${prefixCls}-svg`)}
          viewBox={`0 0 ${width} ${width}`}
          width={width}
          height={width}
        >
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeHeight}
            className="arc-background"
          />

          <circle
            cx={cx}
            cy={cy}
            r={radius}
            strokeWidth={strokeHeight}
            className={`${sc("circle-color")}-${theme}`}
            strokeDashoffset={op >= 0 ? op : 0}
            strokeDasharray={perimeter}
          />
        </svg>

        {showText && (
          <div
            className={classNames(`${prefixCls}-circle-text`)}
          >{`${text}${unit}`}</div>
        )}
      </div>
    );
  }

  return (
    <div className="chocolate-progress" style={style}>
      <div className={sc("bar-outer")} style={{ height: `${strokeHeight}px` }}>
        <div
          className={classNames(`${sc("bar-inner")}`, `color-${theme}`, {
            [`${prefixCls}-bar-inner-animate`]: animation,
          })}
          style={{ width: `${text}${unit}` }}
        >
          {showText && (
            <span className={sc("bar-inner-text")}>{`${text}${unit}`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 12,
  showText: true,
  theme: "primary",
  percent: 0,
};

export default Progress;
