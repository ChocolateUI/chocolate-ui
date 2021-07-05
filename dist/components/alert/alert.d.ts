import { FC, MouseEventHandler } from 'react';
export declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
interface BaseAlertProps {
    className?: string;
    /** 警告提示内容 */
    message: string;
    /** 警告提示的辅助性文字介绍 */
    description?: string;
    /** 默认不显示关闭按钮 */
    closable?: boolean;
    /** 指定警告提示的样式，有四种选择 success、default、warning、danger */
    type?: AlertType;
    /** 关闭时触发的回调函数 */
    onClose?: MouseEventHandler<HTMLButtonElement>;
}
export declare const Alert: FC<BaseAlertProps>;
export default Alert;
