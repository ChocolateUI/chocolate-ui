import React from "react";
import { Story, Meta } from "@storybook/react";
import { CheckboxProps } from "./checkbox";
import Checkbox from "./index";
import CheckBox from "./checkbox-doc.mdx";
import Card from "../Card/card";

const BaseCheckbox = (props: CheckboxProps) => {
  const commonCss = { marginRight: 20 };
  const cardCss = { margin: "20px 20px 0 0" };
  return (
    <div style={{ display: "flex", width: 1024, flexWrap: "wrap" }}>
      <Card title="基础使用" style={cardCss} shadow>
        <Checkbox value="1" style={commonCss}>
          西瓜🍉
        </Checkbox>
        <Checkbox value="2" style={commonCss}>
          葡萄🍇
        </Checkbox>
        <Checkbox value="3" indeterminate={true}>
          菠萝🍍
        </Checkbox>
      </Card>
      <Card title="默认选中" style={cardCss} shadow>
        <Checkbox value="1" checked style={commonCss}>
          西瓜🍉
        </Checkbox>
        <Checkbox value="2" checked style={commonCss}>
          葡萄🍇
        </Checkbox>
        <Checkbox value="3" checked indeterminate={true}>
          菠萝🍍
        </Checkbox>
      </Card>
      <Card title="不可选中" style={cardCss} shadow>
        <Checkbox value="1" checked={false} disabled style={commonCss}>
          西瓜🍉
        </Checkbox>
        <Checkbox value="2" checked disabled style={commonCss}>
          葡萄🍇
        </Checkbox>
        <Checkbox value="3" checked disabled indeterminate={true}>
          菠萝🍍
        </Checkbox>
      </Card>
      <Card title="Checkbox Group" style={cardCss} shadow>
        <Checkbox.Group
          onChange={(value: string[]) => {
            console.log(value, "value");
          }}
        >
          <Checkbox value="苹果" checked style={{ marginRight: 20 }}>
            苹果🍎
          </Checkbox>
          <Checkbox value="茄子" isButton={true} style={{ marginRight: 20 }}>
            茄子🍆
          </Checkbox>
          <Checkbox
            value="玉米"
            indeterminate={false}
            checked
            style={{ marginRight: 20 }}
          >
            玉米🌽
          </Checkbox>
          <Checkbox value="番茄">番茄🍅</Checkbox>
        </Checkbox.Group>
      </Card>
    </div>
  );
};

export default {
  component: BaseCheckbox,
  title: "Checkbox 多选框",
  parameters: {
    docs: {
      page: CheckBox,
      source: {
        type: "code",
      },
    },
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

export const Primary = _default.bind({});

Primary.args = {
  className: "",
  checked: false,
  isButton: false,
  indeterminate: false,
};
