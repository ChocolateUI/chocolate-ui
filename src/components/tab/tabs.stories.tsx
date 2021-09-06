import React from 'react';
import { Meta, Story } from '@storybook/react';
import Tabs, { TabsProps } from './tabs';
import TabItem from './tabItem';
import Icon from '../Icons/icon';
import TabsDoc from './tab-doc.mdx'

const BaseTabs = (props: TabsProps) => {

  const { defaultIndex, type } = props;
  return (
    <Tabs
      defaultIndex={defaultIndex}
      onSelect={(value) => console.log('第', value, '项')}
      type={type}
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
}

const IconTabs = (props: TabsProps) => {
  const { defaultIndex, type } = props;
  return (
    <Tabs
      defaultIndex={defaultIndex}
      onSelect={(value) => console.log('第', value, '项')}
      type={type}
    >
      <TabItem label="Tab 1">
        Content of Tab Pane 1
      </TabItem>
      <TabItem  label={<span> <Icon icon="music" style={{ marginRight: 5 }} />Tab 2</span>}>
        Content of Tab Pane 2
      </TabItem>
      <TabItem label="Tab 3">
        Content of Tab Pane 3
      </TabItem>
    </Tabs>
  )
}

export default {
  component: Tabs,
  title: 'Tabs',
  parameters: {
    docs: {
      page: TabsDoc,
      source: {
        type: 'code'
      }
    },
    controls: { 
      include: [],
      hideNoControlsWarning: true 
    }
  }
} as Meta;

const _default: Story<TabsProps> = (args) => <BaseTabs {...args} />;

export const LineType = _default.bind({});

LineType.args = {
  defaultIndex: 0,
  type: 'line',
}


export const CardType = _default.bind({});

CardType.args = {
  defaultIndex: 1,
  type: 'card'
}

const _withIcon: Story<TabsProps> = (args) => <IconTabs {...args} />
export const WithIcon = _withIcon.bind({});

WithIcon.args = {
  ...LineType.args,
  type: 'card'
}