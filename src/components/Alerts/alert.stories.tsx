import React from "react";
import { Story, Meta } from "@storybook/react";
import Alert, { BaseAlertProps } from "./alert";
import AlertDoc from "./alert-doc.mdx";
import Card from "../Card/card";
import "../../styles/common.stories";

const BaseAlert = () => {
  const commonCss = { width: 450, marginBottom: 20 };
  const cardCss = { margin: "20px 20px 0 0" };

  return (
    <div className="container">
      <div className="item">
        <Card title="默认" style={cardCss} shadow>
          <Alert
            style={commonCss}
            message="这是一个 default 类型 alert"
            type="default"
          />
          <Alert
            style={commonCss}
            message="这是一个 success 类型 alert"
            type="success"
          />
          <Alert
            style={commonCss}
            message="这是一个 danger 类型 alert"
            type="danger"
          />
          <Alert
            style={{ width: 450 }}
            message="这是一个 warning 类型 alert"
            type="warning"
          />
        </Card>
      </div>
      <div className="item">
        <Card title="显示描述信息" style={cardCss} shadow>
          <Alert
            style={commonCss}
            message="Default"
            description="这是一个 primary 类型 alert"
            type="default"
          />
          <Alert
            style={commonCss}
            message="Success"
            description="这是一个 success 类型 alert"
            type="success"
          />
          <Alert
            style={commonCss}
            message="Danger"
            description="这是一个 danger 类型 alert"
            type="danger"
          />
          <Alert
            style={{ width: 450 }}
            message="Warning"
            description="这是一个 warning 类型 alert"
            type="warning"
          />
        </Card>
      </div>
      <div className="item">
        <Card title="可以关闭" style={cardCss} shadow>
          <Alert
            style={commonCss}
            closable
            message="Default"
            description="这是一个 primary 类型 alert"
            type="default"
          />
          <Alert
            style={commonCss}
            closable
            message="Success"
            description="这是一个 success 类型 alert"
            type="success"
          />
          <Alert
            style={commonCss}
            closable
            message="Danger"
            description="这是一个 danger 类型 alert"
            type="danger"
          />
          <Alert
            style={{ width: 450 }}
            closable
            message="Warning"
            description="这是一个 warning 类型 alert"
            type="warning"
          />
        </Card>
      </div>
      <div className="item">
        <Card title="Icon" style={cardCss} shadow>
          <Alert
            style={commonCss}
            message="Default"
            description="这是一个 primary 类型 alert"
            type="default"
            icon="camera-retro"
          />
          <Alert
            style={commonCss}
            message="Success"
            description="这是一个 success 类型 alert"
            type="success"
            icon="atom"
          />
          <Alert
            style={commonCss}
            message="Danger"
            description="这是一个 danger 类型 alert"
            type="danger"
            icon="beer"
          />
          <Alert
            style={{ width: 450 }}
            message="Warning"
            description="这是一个 warning 类型 alert"
            type="warning"
            icon="balance-scale"
          />
        </Card>
      </div>
    </div>
  );
};

export default {
  Component: Alert,
  title: "Alert 警告提示",
  parameters: {
    docs: {
      page: AlertDoc,
      source: {
        type: "code",
      },
    },
    layout: "centered",
    controls: { exclude: ["className", "type"] },
  },
} as Meta;

const _default: Story<BaseAlertProps> = () => <BaseAlert />;

// default
export const Primary = _default.bind({});

Primary.args = {
  className: "",
  message: "Tips",
  description: "Detailed description and advice about default copywriting.",
  closable: false,
  type: "default",
};
