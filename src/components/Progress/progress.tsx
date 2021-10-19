import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
import { scopedClass } from '../../utils/scopedClass'

const sc = scopedClass('chocolate-progress')

export interface ProgressProps {
  /**
   * 控制进度条的进度
   */
  percent: number,
  /**
   * 控制进度条的高度
   */
  strokeHeight?: number,
  /**
   * 是否展示进度条提示
   */
  showText?: boolean,
  /**
   * 自定义样式
   */
  style?: React.CSSProperties,
  /**
   * 主题
   */
  theme?: ThemeProps,
}

export const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    style,
    theme,
  } = props;
  return (
    <div className="chocolate-progress" style={style}>
      <div className={sc("bar-outer")} style={{ height: `${strokeHeight}px` }}>
        <div
          className={`${sc("bar-inner")} color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className={sc('bar-inner-text')}>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
  percent: 0,
}

export default Progress;
