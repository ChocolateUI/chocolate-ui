import React, {
  ReactElement,
  FC,
  ChangeEvent,
  InputHTMLAttributes,
  useState,
  forwardRef,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { scopedClass } from "../../utils/scopedClass";
import Icon from "../Icon/icon";

const sc = scopedClass("chocolate-input");

type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  ref?: any;
}

export const Input: FC<InputProps> = forwardRef((props, ref) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    onChange = () => {},
    ...restProps
  } = props;
  const [hover, setHover] = useState(false);
  const classnames = classNames(sc("wrapper"), {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
    [`${sc("inner")}-is-hover`]: hover,
  });

  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };

  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={classnames} style={style}>
      {prepend && <div className={sc("group-prepend")}>{prepend}</div>}
      {icon && (
        <div className={sc("icon-wrapper")}>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className={sc("inner")}
        onMouseOver={() => setHover(!disabled)}
        onMouseLeave={() => setHover(false)}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      {append && <div className={sc("group-append")}>{append}</div>}
    </div>
  );
});

Input.defaultProps = {
  disabled: false,
  size: "sm",
  icon: undefined,
  prepend: "",
  append: "",
};

export default Input;
