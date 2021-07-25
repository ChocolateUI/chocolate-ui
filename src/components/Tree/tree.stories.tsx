import React from 'react'
import { Meta, Story } from '@storybook/react'
import Tree, { TreeProps } from './tree'
import { data } from './data';
const BaseTree = (props: TreeProps) => {
  const { treeData } = props;
  return <Tree
    treeData={treeData}
    checkable
    defaultCheckedKeys={['0-0-0-0-0', '0-0-0-0-1']}
  />
}

export default {
  component: Tree,
  title: 'Tree',
} as Meta;

const _default: Story<TreeProps> = (args) => <BaseTree {...args} />;

// primary
export const Primary = _default.bind({});

Primary.args = {
  treeData: data
}