import React, { FC, ChangeEvent, useState } from "react";
import classNames from "classnames";
import scopedClass from "../../utils/scopedClass";

const sc = scopedClass("chocolate-checkbox");

export type CheckboxSize = "default" | "small" | "large";

export interface CheckboxProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  checked?: boolean;
  defaultValue?: string;
  indeterminate?: boolean;
  size?: CheckboxSize;
  isButton?: boolean;
  className?: string;
  value?: string;
}

export const CheckboxComponent: FC<CheckboxProps> = (props) => {
  const {
    className,
    checked,
    isButton,
    children,
    disabled,
    size,
    indeterminate,
    value,
    onChange
  } = props;
  const [isChecked, setIsChecked] = useState(checked);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    onChange && onChange(e);
  };
  return (
    <label
      className={classNames(sc("wrapper"), {
        [`${sc("button-wrapper")}`]: isButton,
        [`${sc("checked")}`]: isChecked,
        [`${sc("disabled")}`]: disabled,
        [`${sc("indeterminate")}`]: isChecked && indeterminate,
        [`${sc(`${size}`)}`]: isButton,
      })}
    >
      <span
        className={classNames(sc(""), className, {
          [`${sc("button")}`]: isButton,
        })}
      >
        <input
          type="checkbox"
          value={value}
          checked={isChecked}
          className={classNames(sc("input"))}
          onChange={handleOnChange}
          disabled={disabled}
        />
        <span className={classNames(sc("inner"))} />
      </span>
      <span>{children}</span>
    </label>
  );
};

export default CheckboxComponent;
