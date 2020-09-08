import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
import { scopedClass } from '../../utils/scopedClass'

const sc = scopedClass('chocolate-progress')

export interface ProgressProps {
  percent: number,
  strokeHeight?: number,
  showText?: boolean,
  styles?: React.CSSProperties,
  theme?: ThemeProps,
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props;
  return (
    <div className="chocolate-progress" style={styles}>
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
}

export default Progress;
