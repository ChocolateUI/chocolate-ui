import React from "react";
import { Story, Meta } from "@storybook/react";
import Select, { SelectProps } from "./select";
import Option from "./selectOption";
import SelectDoc from "./select-doc.mdx";
import Card from "../Card/card";

const BaseSelect = () => {
  const cardCss = { margin: "20px 20px 0 0" };
  return (
    <div style={{ display: "flex", width: 1024, flexWrap: "wrap" }}>
      <Card title="基础使用" style={cardCss} shadow>
        <Select style={{ width: 300 }} placeholder="请选择">
          <Option value="苹果 🍎 "> 苹果 🍎 </Option>
          <Option value="橘子 🍊">橘子 🍊</Option>
          <Option value=" 葡萄 🍇"> 葡萄 🍇 </Option>
          <Option value="香蕉 🍌 "> 香蕉 🍌 </Option>
        </Select>
      </Card>
      <Card title="默认值" style={cardCss} shadow>
        <Select
          style={{ width: 300 }}
          defaultValue="橘子 🍊"
          placeholder="请选择"
        >
          <Option value="苹果 🍎"> 苹果 🍎 </Option>
          <Option value="橘子 🍊">橘子 🍊</Option>
          <Option value="葡萄 🍇"> 葡萄 🍇 </Option>
          <Option value="香蕉 🍌"> 香蕉 🍌 </Option>
        </Select>
      </Card>
      <Card title="不可选择" style={cardCss} shadow>
        <Select style={{ width: 300 }} placeholder="请选择">
          <Option value="苹果 🍎"> 苹果 🍎 </Option>
          <Option value="橘子 🍊">橘子 🍊</Option>
          <Option value="葡萄 🍇" disabled>
            葡萄 🍇
          </Option>
          <Option value="香蕉 🍌"> 香蕉 🍌 </Option>
        </Select>
      </Card>
    </div>
  );
};
export default {
  component: Select,
  title: "Select 选择器",
  parameters: {
    docs: {
      page: SelectDoc,
      source: {
        type: "code",
      },
    },
    controls: {
      include: ["disabled"],
      hideNoControlsWarning: true,
    },
  },
} as Meta;

const _default: Story<SelectProps> = () => <BaseSelect />;

export const Primary = _default.bind({});

Primary.args = {
  defaultValue: "橘子 🍊",
  disabled: false,
};
