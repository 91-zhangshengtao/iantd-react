import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
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
declare const Progress: FC<ProgressProps>;
export default Progress;
