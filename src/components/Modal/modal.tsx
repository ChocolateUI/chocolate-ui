import React, { FC, useState, KeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import close from "./close.png";
import Button from "../Button";
import Icon from "../Icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ThemeProps } from "../Icon/icon";

const prefixCls = "chocolate-modal";

export interface ModalProps {
  /**
   * Modal 框内容，与 children 二选一展示，content 优先
   */
  content?: string | ReactNode;
  /**
   * 标题
   */
  title: string;
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 取消事件
   */
  onCancel?: () => void;
  /**
   * 确认事件
   */
  onOk?: () => void;
  /**
   * 设置单独的 class
   */
  className?: string;
  /**
   * 底部布局
   */
  footer?: ReactNode;
  /**
   * 单独设置确认按钮文案
   */
  okText?: string;
  /**
   * 单独设置取消按钮文案
   */
  cancelText?: string;
  /**
   * 是否居中展示
   */
  centered?: boolean;
  /**
   * 是否展示关闭按钮
   */
  closable?: boolean;
  /**
   * 蒙层可关闭
   */
  maskClosable?: boolean;
  /**
   * 是否展示蒙层
   */
  showMask?: boolean;
  /**
   * 添加自定义样式
   */
  style?: CSSStyleSheet;
  /**
   * 可以单独设置模态框宽度
   */
  width?: number;
  /**
   * 单独设置模态框层级
   */
  zIndex?: number;
  /**
   * 设置确认按钮 props
   */
  okButtonProps?: {};
  /**
   * 设置取消按钮 props
   */
  cancelButtonProps?: {};
  /**
   * 添加模态框额外外层样式
   */
  wrapperClassName?: string;
  /**
   * esc 关闭模态框
   */
  escClose?: boolean;
  /**
   * 添加图标到标题后
   */
  icon?: IconProp;
  /**
   * 图标主题
   */
  theme?: ThemeProps;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    children,
    content,
    title,
    visible,
    onCancel,
    onOk,
    className,
    footer,
    okText,
    cancelText,
    centered,
    closable,
    maskClosable,
    showMask,
    style,
    width,
    zIndex,
    okButtonProps,
    cancelButtonProps,
    wrapperClassName,
    escClose,
    icon,
    theme,
    ...attr
  } = props;
  const ESC_KEY_CODE = 27;
  const [init, setInit] = useState(false);

  const _onOk = () => {
    onOk && onOk();
  };
  const _onCancel = () => {
    onCancel && onCancel();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!escClose) {
      return;
    }
    if (e.keyCode === ESC_KEY_CODE) {
      e.stopPropagation();
      _onCancel();
    }
  };
  const maskClickHandle = maskClosable ? { onClick: _onCancel } : {};

  const defaultFooter = (
    <>
      <Button btnType="default" {...cancelButtonProps} onClick={_onCancel}>
        {cancelText}
      </Button>
      <Button btnType="primary" {...okButtonProps} onClick={_onOk}>
        {okText}
      </Button>
    </>
  );
  return createPortal(
    <>
      {showMask && (
        <div
          className={classNames(`${prefixCls}-mask`, {
            [`${prefixCls}-mask-show`]: visible,
            [`${prefixCls}-mask-hide`]: init && !visible,
          })}
          {...maskClickHandle}
        />
      )}
      <div
        role="dialog"
        tabIndex={1}
        className={classNames(`${prefixCls}-wrap`, wrapperClassName, {
          [`${prefixCls}-centered`]: centered,
          [`${prefixCls}-wrap-visible`]: visible,
        })}
        onKeyDown={onKeyDown}
      >
        <div
          className={classNames(prefixCls, className, {
            [`${prefixCls}-open`]: visible,
            [`${prefixCls}-close`]: init && !visible,
            "no-title": !title,
          })}
          style={{
            ...style,
            width,
            zIndex,
          }}
          {...attr}
        >
          <section className={`${prefixCls}-header`}>
            <div className={`${prefixCls}-title`}>
              {title}
              {icon ? <Icon icon={icon} theme={theme} style={{ marginLeft: 5 }}/> : null}
            </div>
            {closable && (
              <img
                src={close}
                className={`${prefixCls}-close`}
                onClick={_onCancel}
                alt=""
              />
            )}
          </section>
          <section className={`${prefixCls}-content`}>
            {content || children}
          </section>
          {footer ? (
            <section className={`${prefixCls}-footer`}>{footer}</section>
          ) : (
            <section className={`${prefixCls}-footer default-footer`}>
              {defaultFooter}
            </section>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

Modal.defaultProps = {
  showMask: true,
  width: 400,
  title: "",
  onOk: () => {},
  onCancel: () => {},
  okText: "确定",
  cancelText: "取消",
  footer: null,
  content: "",
  maskClosable: true,
  centered: false,
  closable: true,
  zIndex: 999,
  okButtonProps: {},
  cancelButtonProps: {},
  escClose: true,
};

export default Modal;
