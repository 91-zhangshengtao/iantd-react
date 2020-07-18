import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'
export interface ProgressProps {
  /** 百分比 */
  percent: number;
  /** bar高度 */
  strokeHeight?: number;
  /** 是否显示文字 */
  showText?: boolean;
  styles?: React.CSSProperties;
  /** "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark"  */
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props
  return (
    <div className="viking-progress-bar" style={styles}>
      {/* 灰色bar */}
      <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        {/* theme  */}
        <div 
          className={`viking-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
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
