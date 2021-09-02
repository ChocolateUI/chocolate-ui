import React from "react";
import { Story, Meta } from "@storybook/react";
import { CheckboxProps } from "./checkbox";
import Checkbox from "./index";
import { CheckboxGroupProps } from "./checkboxGroup";
import CheckBox from './checkbox-doc.mdx'

const BaseCheckbox = (props: CheckboxProps) => {
  const {
    disabled,
    checked,
    defaultValue,
    indeterminate,
    size,
    isButton,
  } = props;
  return (
    <div>
      <h6>基本使用</h6>
      <Checkbox
        onChange={(e) => console.log(e.target.checked)}
        disabled={disabled}
        checked={checked}
        defaultValue={defaultValue}
        indeterminate={indeterminate}
        isButton={isButton}
        size={size}
        style={{ marginRight: 20 }}
      >
        香蕉
      </Checkbox>
      <h6 style={{ marginTop: 50 }}>禁用</h6>
      <Checkbox
        onChange={(e) => console.log(e.target.checked)}
        checked={true}
        disabled={true}
      >
        葡萄
      </Checkbox>
      <h6 style={{ marginTop: 50 }}>不确定</h6>
      <Checkbox
        onChange={(e) => console.log(e.target.checked)}
        checked={true}
        indeterminate={true}
      >
        橘子
      </Checkbox>
      {CheckboxGroup(props as CheckboxGroupProps)}
      {/* {CheckButton(props)} */}
    </div>
  );
};

const CheckboxGroup = (props: CheckboxGroupProps) => {
  return (
    <div>
      <h6 style={{ marginTop: 50 }}>组合 && 默认选中</h6>
      <Checkbox.Group
        onChange={(value: string[]) => {
          console.log(value, "value");
        }}
      >
        <Checkbox value="苹果" checked  style={{ marginRight: 20 }}>
          苹果
        </Checkbox>
        <Checkbox value="茄子" isButton={true} style={{ marginRight: 20 }}>
          茄子
        </Checkbox>
        <Checkbox value="玉米" indeterminate={false} checked style={{ marginRight: 20 }}>
          玉米
        </Checkbox>
        <Checkbox value="番茄">番茄</Checkbox>
      </Checkbox.Group>
    </div>
  );
};

// const CheckButton = (props: CheckboxProps) => {
//   return (
//     <div>
//       <h6 style={{ marginTop: 50 }}>按钮模式</h6>
//       <Checkbox.Button style={{ marginRight: 20 }}>苹果</Checkbox.Button>
//       <Checkbox.Button style={{ marginRight: 20 }}>茄子</Checkbox.Button>
//       <Checkbox.Button checked disabled>
//         玉米
//       </Checkbox.Button>
//     </div>
//   );
// };

export default {
  component: BaseCheckbox,
  title: "Checkbox",
  parameters: {
    docs: {
      page: CheckBox,
      source: {
        type: 'code'
      }
    }
  },
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
