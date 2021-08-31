import React, { FC, ChangeEvent, useState } from "react";
import classNames from "classnames";
import scopedClass from "../../utils/scopedClass";
import CheckboxComponent, { CheckboxProps, CheckboxSize } from "./checkbox";

const sc = scopedClass("chocolate-checkbox-group");

export interface CheckboxGroupProps {
  size?: CheckboxSize,
  disabled?: boolean,
  defaultValue?: string[],
  onChange?: (value: string[]) => void,
  className?: string,
}

export const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const {
    children,
    size,
    disabled,
    defaultValue,
    onChange,
    className,
    ...rest
  } = props

  const getCheckoutValue = (children: any) => {
    const checkedValue: any[] = []
    //遍历子节点 看是否有选中的值
    React.Children.forEach(children, (checkbox) => {
      if (
        (checkbox.props && checkbox.props.checked) ||
        checkbox.props.defaultChecked
      ) {
        checkedValue.push(checkbox.props.value)
      }
    });
    return checkedValue;
  };
  const [value, setValue] = useState<string[]>(getCheckoutValue(children))

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value.trim()
    const currentIndex = value.findIndex((v) => v === currentValue)

    //如果没在就加入数组 否则就是 取消选中 删除掉
    if (currentIndex < 0) {
      value.push(currentValue)
    } else {
      value.splice(currentIndex, 1)
    }
    setValue(value)
    onChange && onChange(value)
  };

  // 遍历子节点 对比当前value 和  子节点 value 是否相同
  const items = React.Children.map(children, (checkbox, index) => {
    const childElement = checkbox as React.FunctionComponentElement<CheckboxProps>
    return (
      <CheckboxComponent
        key={index}
        size={size}
        disabled={disabled}
        onChange={onCheckboxChange}
        checked={childElement.props.checked}
        {...childElement.props}
      />
    );
  });
  return (
    <div className={classNames(sc(""), className)} {...rest}>
      {items}
    </div>
  );
};

export default CheckboxGroup;
