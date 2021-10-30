import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import Button, { BaseButtonProps } from "./button";
import ButtonDoc from "./button-doc.mdx";
import Card from "../Card/card";
import "../../styles/common.stories";

const BaseButton = () => {
  const commonCss = { marginBottom: 20, marginRight: 20 };
  const cardCss = { margin: "20px 20px 0 0" };
  const textCss = { fontSize: 14, marginBottom: 20 };
  const [loading, setLoading] = useState(false);
  return (
    <div className="container">
      <div className="item">
        <Card title="基础使用" style={cardCss} shadow>
          <div style={textCss}>
            支持<code> 5种 </code>类型的按钮
          </div>
          <Button btnType="default" style={commonCss}>
            Default
          </Button>
          <Button btnType="primary" style={commonCss}>
            Primary
          </Button>
          <Button btnType="danger" style={commonCss}>
            Danger
          </Button>
          <div
            style={{
              backgroundColor: "#e6ecf1",
              height: 40,
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Button btnType="ghost">Ghost</Button>
          </div>
          <Button btnType="link" style={commonCss}>
            Link
          </Button>
        </Card>
      </div>
      <div className="item">
        <Card title="不同大小" style={cardCss} shadow>
          <div style={textCss}>
            具有两种类型的大小，分别是 <code>sm 和 lg</code> 默认是{" "}
            <code>sm</code> 类型{" "}
          </div>
          <Button size="sm" btnType="default" style={commonCss}>
            Small Default
          </Button>
          <Button size="lg" btnType="primary" style={commonCss}>
            Large Primary
          </Button>
          <Button size="lg" btnType="danger" style={commonCss}>
            Large Danger
          </Button>
          <div
            style={{
              backgroundColor: "#6777ef",
              height: 50,
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <div>
              <Button size="lg" btnType="ghost">
                Large Ghost
              </Button>
            </div>
          </div>
          <Button size="lg" btnType="link" style={commonCss}>
            Large Link
          </Button>
        </Card>
      </div>
      <div className="item">
        <Card title="Icon 按钮" style={cardCss} shadow>
          <Button icon="check" btnType="default" style={commonCss}>
            Default
          </Button>
          <Button icon="battery-half" btnType="primary" style={commonCss}>
            Primary
          </Button>
          <Button icon="bolt" btnType="danger" style={commonCss}>
            Danger
          </Button>
          <div
            style={{
              backgroundColor: "#e6ecf1",
              height: 40,
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Button icon="caret-square-right" btnType="ghost">
              Ghost
            </Button>
          </div>
          <Button btnType="link" style={commonCss}>
            Link
          </Button>
        </Card>
      </div>
      <div className="item">
        <Card title="加载中..." style={cardCss} shadow>
          <Button loading icon="check" btnType="default" style={commonCss}>
            Default Loading
          </Button>
          <Button
            loading
            icon="battery-half"
            btnType="primary"
            style={commonCss}
          >
            Primary Loading
          </Button>
          <Button loading icon="bolt" btnType="danger" style={commonCss}>
            Danger Loading
          </Button>
          <div
            style={{
              backgroundColor: "#e6ecf1",
              height: 40,
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Button loading icon="caret-square-right" btnType="ghost">
              Ghost Loading
            </Button>
          </div>
          <Button loading btnType="link" style={commonCss}>
            Link Loading
          </Button>
          <div style={{ marginBottom: 20 }}>
            <code>⬇️ 点击后进入加载状态，2 秒后恢复</code>
          </div>
          <Button
            loading={loading}
            btnType="primary"
            style={commonCss}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
          >
            点一下
          </Button>
        </Card>
      </div>
      <div className="item">
        <Card title="不可用" style={cardCss} shadow>
          <Button btnType="default" disabled style={commonCss}>
            Default
          </Button>
          <Button btnType="primary" disabled style={commonCss}>
            Primary
          </Button>
          <Button btnType="danger" disabled style={commonCss}>
            Danger
          </Button>
          <div
            style={{
              backgroundColor: "#e6ecf1",
              height: 40,
              borderRadius: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Button btnType="ghost" disabled>
              Ghost
            </Button>
          </div>
          <Button btnType="link" style={commonCss} disabled>
            Link
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default {
  component: Button,
  title: "Button 按钮",
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      options: ["sm", "lg"],
      control: { type: "select" },
    },
    href: {
      options: ["http://www.baidu.com", "http://www.google.com"],
      control: { type: "radio" },
    },
  },
  parameters: {
    docs: {
      page: ButtonDoc,
      source: {
        type: "code",
      },
    },
    layout: "centered",
    controls: { exclude: ["className", "btnType"] },
  },
} as Meta;

// _default
const _default: Story<BaseButtonProps> = () => <BaseButton />;

export const Primary = _default.bind({});

Primary.args = {
  className: "",
  disabled: false,
  size: "sm",
  btnType: "default",
  href: "http://www.baidu.com",
};
