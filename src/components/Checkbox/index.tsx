import { FC } from "react"
import CheckboxComponent, { CheckboxProps } from "./checkbox"
import CheckboxGroup, { CheckboxGroupProps } from "./checkboxGroup"
import CheckboxButton from "./checkboxButton"

export type ICheckboxComponent = FC<CheckboxProps> & {
  Group: FC<CheckboxGroupProps>
  Button: FC<CheckboxProps>
};

const Checkbox = CheckboxComponent as ICheckboxComponent;

Checkbox.Group = CheckboxGroup;
Checkbox.Button = CheckboxButton;

export default Checkbox;
