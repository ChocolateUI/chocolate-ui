import React from "react";
import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CheckboxProps } from "./checkbox";
import Checkbox from "./index";
import { CheckboxGroupProps } from "./checkboxGroup";


const BaseCheckbox = (props: CheckboxProps) => {
  const { disabled, checked, defaultValue, indeterminate, size, isButton } = props;
  return (
    <div>
      <Checkbox
        onChange={(e) => console.log(e.target.checked)}
        disabled={disabled}
        checked={checked}
        defaultValue={defaultValue}
        indeterminate={indeterminate}
        isButton={isButton}
        size={size}
      >香蕉</Checkbox>
      <Checkbox
        onChange={(e) => console.log(e.target.checked)}
        disabled={true}
      >香蕉1</Checkbox>
      <Checkbox
        onChange={(e) => console.log(e.target.checked)}
        checked={true}
        disabled={true}
      >香蕉2</Checkbox>
      {CheckboxGroup(props as CheckboxGroupProps)}
      {CheckButton(props)}
    </div>
  );
};

const CheckboxGroup = (props: CheckboxGroupProps) => {
  return (
    <Checkbox.Group onChange={(value: string[]) => {
      console.log(value, 'value');
    }}>
      <Checkbox value="黄瓜" checked>黄瓜</Checkbox>
      <Checkbox value="茄子" isButton={true}>茄子</Checkbox>
      <Checkbox value="玉米" indeterminate={true} checked>
        玉米
      </Checkbox>
      <Checkbox value="番茄">
        番茄
      </Checkbox>
    </Checkbox.Group>
  );
};

const CheckButton = (props: CheckboxProps) => {
  return (
    <div>
      <Checkbox.Button>黄瓜 ui</Checkbox.Button>
      <Checkbox.Button>黄瓜 ui</Checkbox.Button>
      <Checkbox.Button checked disabled>
        黄瓜 ui
      </Checkbox.Button>
    </div>
  );
};

export default {
  component: BaseCheckbox,
  title: "Checkbox",
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} as Meta;

// _default
const _default: Story<CheckboxProps> = (args) => <BaseCheckbox {...args} />;

export const Default = _default.bind({});

Default.args = {
  className: "",
  checked: false,
  isButton: false,
  indeterminate: false,
};
