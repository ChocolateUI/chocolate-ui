import React from "react";
import { Meta, Story } from "@storybook/react";
import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabItem";
import Icon from "../Icon/icon";
import TabsDoc from "./tab-doc.mdx";
import Card from "../Card/card";
import {
  DescriptionBrave,
  DescriptionEle,
  DescriptionMoon,
} from "../../utils/constants";
import "../../styles/common.stories";

const BaseTabs = () => {
  const cardCss = { margin: "20px 20px 0 0", width: 450 };
  return (
    <div className="container">
      <div className="item">
        <Card title="基础使用" style={cardCss} shadow>
          <Tabs>
            <TabItem label="Tab 1">{DescriptionEle}</TabItem>
            <TabItem label="Tab 2">{DescriptionBrave}</TabItem>
            <TabItem label="Tab 3">{DescriptionMoon}</TabItem>
          </Tabs>
        </Card>
      </div>

      <div className="item">
        <Card title="卡片类型" style={cardCss} shadow>
          <Tabs type="card">
            <TabItem label="Tab 1">{DescriptionEle}</TabItem>
            <TabItem label="Tab 2">{DescriptionBrave}</TabItem>
            <TabItem label="Tab 3">{DescriptionMoon}</TabItem>
          </Tabs>
        </Card>
      </div>

      <div className="item">
        <Card title="默认选中" style={cardCss} shadow>
          <Tabs type="line" defaultIndex={1}>
            <TabItem label="Tab 1">{DescriptionEle}</TabItem>
            <TabItem label="Tab 2">{DescriptionBrave}</TabItem>
            <TabItem label="Tab 3">{DescriptionMoon}</TabItem>
          </Tabs>
        </Card>
      </div>

      <div className="item">
        <Card title="Icon" style={cardCss} shadow>
          <Tabs type="card">
            <TabItem
              label={
                <span>
                  <Icon icon="music" style={{ marginRight: 5 }} />
                  Tab 2
                </span>
              }
            >
              {DescriptionEle}
            </TabItem>
            <TabItem label="Tab 2">{DescriptionBrave}</TabItem>
            <TabItem label="Tab 3">{DescriptionMoon}</TabItem>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default {
  component: Tabs,
  title: "Tabs 标签页",
  parameters: {
    docs: {
      page: TabsDoc,
      source: {
        type: "code",
      },
    },
    controls: {
      include: [],
      hideNoControlsWarning: true,
    },
  },
} as Meta;

const _default: Story<TabsProps> = () => <BaseTabs />;

export const Primary = _default.bind({});

Primary.args = {
  defaultIndex: 0,
  type: "line",
};
