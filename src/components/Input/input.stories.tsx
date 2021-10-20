import React from "react";
import { Story, Meta } from "@storybook/react";
import Input, { InputProps } from "./input";
import InputDoc from "./input-doc.mdx";
import Card from "../Card/card";
import "../../styles/common.stories";

const BaseInput = () => {
  const commonCss = { width: 300, marginBottom: 20 };
  const cardCss = { margin: "20px 20px 0 0" };
  return (
    <div className="container">
      <div className="item">
        <Card title="基础使用" style={cardCss} shadow>
          <Input placeholder="请输入..." style={commonCss} />
        </Card>
      </div>

      <div className="item">
        <Card title="不同大小" style={cardCss} shadow>
          <Input size="sm" placeholder="请输入..." style={commonCss} />
          <Input size="lg" placeholder="请输入..." style={commonCss} />
        </Card>
      </div>

      <div className="item">
        <Card title="前置/后置标签" style={cardCss} shadow>
          <Input prepend="https://" placeholder="请输入..." style={commonCss} />
          <Input append=".com" placeholder="请输入..." style={commonCss} />
        </Card>
      </div>

      <div className="item">
        <Card title="有默认值" style={cardCss} shadow>
          <Input
            size="sm"
            placeholder="请输入..."
            defaultValue="defaultValue"
            style={commonCss}
          />
        </Card>
      </div>

      <div className="item">
        <Card title="不可用" style={cardCss} shadow>
          <Input
            disabled
            size="sm"
            placeholder="输入禁用"
            style={commonCss}
          />
        </Card>
      </div>
    </div>
  );
};

export default {
  component: Input,
  title: "Input 输入框",
  parameters: {
    docs: {
      page: InputDoc,
      source: {
        type: "code",
      },
    },
    controls: {
      include: ["disabled", "size", "placeholder"],
    },
  },
} as Meta;

const _default: Story<InputProps> = () => <BaseInput />;

// 默认
export const Primary = _default.bind({});

Primary.args = {
  disabled: false,
  size: "sm",
  icon: undefined,
  placeholder: "placeholder",
  prepend: "",
  append: "",
  onChange: () => {},
};
