import React from "react";
import { Meta, Story } from "@storybook/react";
import Progress, { ProgressProps } from "./progress";
import ProgressDoc from "./progress-doc.mdx";
import Card from "../Card/card";

const BaseProgress = () => {
  const commonCss = { marginBottom: 20 };
  const commonCssText = { fontSize: 14, marginBottom: 20 };
  const cardCss = { margin: "20px 20px 0 0", width: 500 };
  return (
    <div style={{ display: "flex", width: 1050, flexWrap: "wrap" }}>
      <Card title="主题" style={cardCss} shadow>
        <Progress
          percent={30}
          theme="danger"
          style={commonCss}
          showText={false}
        />
        <Progress
          percent={40}
          theme="dark"
          style={commonCss}
          showText={false}
        />
        <Progress
          percent={50}
          theme="info"
          style={commonCss}
          showText={false}
        />
        <Progress
          percent={60}
          theme="light"
          style={commonCss}
          showText={false}
        />
        <Progress
          percent={70}
          theme="primary"
          style={commonCss}
          showText={false}
        />
        <Progress
          percent={80}
          theme="secondary"
          style={commonCss}
          showText={false}
        />
        <Progress
          percent={90}
          theme="success"
          style={commonCss}
          showText={false}
        />
        <Progress
          percent={100}
          theme="warning"
          style={commonCss}
          showText={false}
        />
      </Card>
      <Card title="展示描述" style={cardCss} shadow>
        <Progress percent={30} theme="danger" style={commonCss} />
        <Progress percent={40} theme="dark" style={commonCss} />
        <Progress percent={50} theme="info" style={commonCss} />
        <Progress percent={60} theme="light" style={commonCss} />
        <Progress percent={70} theme="primary" style={commonCss} />
        <Progress percent={80} theme="secondary" style={commonCss} />
        <Progress percent={90} theme="success" style={commonCss} />
        <Progress percent={100} theme="warning" style={commonCss} />
      </Card>
      <Card title="设置粗细" style={cardCss} shadow>
      <div style={commonCssText}>通过 strokeHeight 来设置进度条的粗细</div>
        <Progress percent={30} theme="danger" strokeHeight={10} style={commonCss} />
        <Progress percent={40} theme="dark" strokeHeight={20} style={commonCss} />
        <Progress percent={50} theme="info" strokeHeight={20} style={commonCss} />
        <Progress percent={60} theme="light" strokeHeight={20} style={commonCss} />
        <Progress percent={70} theme="primary" strokeHeight={20} style={commonCss} />
        <Progress percent={80} theme="secondary" strokeHeight={20} style={commonCss} />
        <Progress percent={90} theme="success" strokeHeight={20} style={commonCss} />
        <Progress percent={100} theme="warning" strokeHeight={30} style={commonCss} />
      </Card>
    </div>
  );
};

export default {
  component: Progress,
  title: "Progress 进度条",
  parameters: {
    docs: {
      page: ProgressDoc,
      source: {
        type: "code",
      },
    },
    controls: {
      // include: ['percent', 'strokeHeight', 'showText', 'theme'],
      hideNoControlsWarning: true,
    },
  },
  argTypes: {
    percent: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    theme: {
      control: {
        type: "select",
        options: [
          "primary",
          "secondary",
          "success",
          "info",
          "warning",
          "danger",
          "light",
          "dark",
        ],
      },
    },
  },
} as Meta;

const _default: Story<ProgressProps> = () => <BaseProgress />;

// primary
export const Primary = _default.bind({});

Primary.args = {
  theme: "primary",
  percent: 30,
  strokeHeight: 10,
  showText: true,
};
