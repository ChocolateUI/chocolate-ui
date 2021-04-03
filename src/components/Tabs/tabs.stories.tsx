import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs from './tabs';
import TabItem from './tabItem';
import Icon from '../icon/icon';


const wrapperStyle: React.CSSProperties = {
  width: '500px'
}
const defaultTabs = () => (
  <Tabs
    defaultIndex={0}
    onSelect={(value) => console.log('第', value, '项')}
    type="line"
  >
    <TabItem label="Tab 1">
      Content of Tab Pane 1
    </TabItem>
    <TabItem label="Tab 2">
      Content of Tab Pane 2
    </TabItem>
    <TabItem label="Tab 3">
      Content of Tab Pane 3
    </TabItem>
  </Tabs>
)

const cardTabs = () => (
  <Tabs
    defaultIndex={1}
    onSelect={(value) => console.log('第', value, '项')}
    type="card"
  >
    <TabItem label="Tab 1">
      Content of Tab Pane 1
    </TabItem>
    <TabItem label="Tab 2">
      Content of Tab Pane 2
    </TabItem>
    <TabItem label="Tab 3">
      Content of Tab Pane 3
    </TabItem>
  </Tabs>
)

const iconTabs = () => (
  <Tabs
    defaultIndex={0}
    onSelect={(value) => console.log('第', value, '项')}
    type="card"
  >
    <TabItem label={<span> <Icon icon="apple-alt" style={{ marginRight: 5 }} />Tab 1</span>}>
      Content of Tab Pane 1
    </TabItem>
    <TabItem label="Tab 2">
      Content of Tab Pane 2
    </TabItem>
    <TabItem label="Tab 3" disabled>
      Content of Tab Pane 3
    </TabItem>
  </Tabs>
)


const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    {stroyFn()}
  </div>
)

storiesOf('Tabs 标签页', module)
  .addDecorator(storyWrapper)
  .add('默认样式', defaultTabs)
  .add('卡片式', cardTabs)
  .add('有图标', iconTabs)


