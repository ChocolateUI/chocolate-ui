import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
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
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'chocolate-ui'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
