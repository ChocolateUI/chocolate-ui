import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { BaseButtonProps } from "./button";
import ButtonDoc from "./button-doc.mdx";
import Card from "../Card/card";
import "../../styles/common.stories";

const BaseButton = () => {
  const commonCss = { marginBottom: 20, marginRight: 20 };
  const cardCss = { margin: "20px 20px 0 0" };

  return (
    <div className="container">
      <div className="item">
        <Card title="基础使用" style={cardCss} shadow>
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
