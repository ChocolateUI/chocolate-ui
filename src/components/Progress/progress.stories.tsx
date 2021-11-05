import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import Progress, { ProgressProps } from "./progress";
import ProgressDoc from "./progress-doc.mdx";
import Card from "../Card/card";
import Button from "../Button";

const BaseProgress = () => {
  const commonCss = { marginBottom: 20 };
  const commonCssText = { fontSize: 14, marginBottom: 20 };
  const cardCss = { margin: "20px 20px 0 0", width: 500 };
  const strokeHeight = 7;
  const [count, setCount] = useState(13);
  const [count2, setCount2] = useState(90);
  return (
    <div className="container">
      <div className="item">
        <Card title="基础使用" style={cardCss} shadow>
          <Progress
            percent={60}
            theme="primary"
            showText={false}
            style={commonCss}
            max={100}
          />
          <Progress
            percent={50}
            showText={false}
            theme="warning"
            style={commonCss}
            max={100}
          />
          <div style={commonCssText}>
            设置
            <code> animation</code> 为<code> true </code>
            时，将会显示动画效果，仅当 <code>type = line</code> 时生效
          </div>
          <Progress
            percent={70}
            theme="danger"
            style={commonCss}
            showText={false}
            animation
            max={100}
          />

          <Progress
            percent={90}
            theme="secondary"
            style={commonCss}
            showText={false}
            animation
            max={100}
          />
          <div style={commonCssText}>
            <code>展示进度值描述：</code>
          </div>
          <Progress percent={50} theme="info" style={commonCss} max={100} />
          <Progress
            percent={88}
            theme="dark"
            showText
            style={commonCss}
            max={100}
          />
        </Card>
      </div>
      <div className="item">
        <Card title="不同主题" style={cardCss} shadow>
          <div style={{ marginBottom: 20, fontSize: 14 }}>
            一共支持七种主题：
            <code>
              primary 、 secondary 、 success 、 warning 、 danger 、 light 、
              dark
            </code>
          </div>
          <Progress
            percent={40}
            theme="dark"
            style={commonCss}
            showText={false}
            max={100}
          />
          <Progress
            percent={30}
            theme="danger"
            style={commonCss}
            showText={false}
            max={100}
          />
          <Progress
            percent={50}
            theme="info"
            style={commonCss}
            showText={false}
            max={100}
          />
          <Progress
            percent={80}
            theme="secondary"
            style={commonCss}
            showText={false}
            max={100}
          />
          <Progress
            percent={70}
            theme="primary"
            style={commonCss}
            showText={false}
            max={100}
          />

          <Progress
            percent={90}
            theme="success"
            style={commonCss}
            showText={false}
            max={100}
          />
          <Progress
            percent={100}
            theme="warning"
            style={commonCss}
            showText={false}
            max={100}
          />
        </Card>
      </div>
      <div className="item">
        <Card
          title="圆形进度条"
          style={{ margin: "20px 20px 0 0", width: 420 }}
          shadow
        >
          <div style={commonCssText}>
            展示圆形进度条，同时也具有<code>不同的七种主题</code>
          </div>
          <div style={{ display: "flex" }}>
            <Progress
              circle
              percent={25}
              strokeHeight={strokeHeight}
              max={100}
              unit="%"
              width={170}
              theme="primary"
              showText
            />
            <Progress
              style={{ marginLeft: 20 }}
              circle
              percent={47}
              strokeHeight={strokeHeight}
              max={100}
              unit="%"
              width={170}
              theme="danger"
              showText
            />
          </div>
        </Card>
      </div>
      <div className="item">
        <Card title="动态演示" style={cardCss} shadow>
          <Progress
            percent={count}
            theme="primary"
            style={commonCss}
            max={100}
          />
          <Button onClick={() => setCount(count - 1 <= 0 ? 0 : count - 1)}>
            完成度 - 1
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            onClick={() => setCount(count + 1 >= 100 ? 100 : count + 1)}
          >
            完成度 + 1
          </Button>
          <Progress
            style={{ margin: "20px 0 20px 0" }}
            circle
            strokeHeight={strokeHeight}
            percent={count2}
            max={100}
            unit="%"
            width={220}
            theme="primary"
            showText
          />
          <Button onClick={() => setCount2(count2 - 5 <= 0 ? 0 : count2 - 5)}>
            完成度 - 5
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            onClick={() => setCount2(count2 + 5 >= 100 ? 100 : count2 + 5)}
          >
            完成度 + 5
          </Button>
        </Card>
      </div>
      <div className="item">
        <Card title="设置粗细" style={cardCss} shadow>
          <div style={commonCssText}>
            通过 <code>strokeHeight</code> 来设置条形进度条的粗细
          </div>
          <Progress
            percent={30}
            theme="danger"
            strokeHeight={10}
            style={commonCss}
            max={100}
          />
          <Progress
            percent={46}
            theme="dark"
            strokeHeight={11}
            style={commonCss}
            max={100}
          />
          <Progress
            percent={87}
            theme="warning"
            strokeHeight={17}
            style={commonCss}
            max={100}
          />
          <Progress
            percent={53}
            theme="info"
            strokeHeight={12}
            style={commonCss}
            max={100}
          />
          <Progress
            percent={72}
            theme="primary"
            strokeHeight={14}
            style={commonCss}
            max={100}
          />
          <Progress
            percent={91}
            theme="success"
            strokeHeight={16}
            style={commonCss}
            max={100}
          />
          <Progress
            percent={80}
            theme="secondary"
            strokeHeight={15}
            style={commonCss}
            max={100}
          />
        </Card>
      </div>
      <div className="item">
        <Card title="圆形进度条不同大小" style={cardCss} shadow>
          <div style={{ marginBottom: 20, fontSize: 14 }}>
            同时可以使用 <code>strokeHeight</code> 来设置圆形进度条的粗细
          </div>
          <div style={{ display: "flex" }}>
            <Progress
              circle
              strokeHeight={strokeHeight}
              percent={47}
              max={100}
              unit="%"
              width={200}
              theme="warning"
              showText
            />
            <Progress
              style={{ marginLeft: 20 }}
              circle
              strokeHeight={10}
              percent={32}
              max={100}
              unit="%"
              width={170}
              theme="dark"
              showText
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <code style={{ marginLeft: 42 }}>strokeHeight=5</code>
            <code style={{ marginLeft: 83 }}>strokeHeight=10</code>
          </div>
        </Card>
      </div>
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
