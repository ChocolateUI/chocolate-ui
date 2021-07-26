import React from 'react'
import { Meta, Story } from '@storybook/react'
import Tree, { TreeProps } from './tree'
import { data } from './data';
import { useArgs } from '@storybook/client-api';
const BaseTree = (props: TreeProps) => {
  const { treeData, checkedKeys, onCheck, checkable, defaultCheckedKeys } = props;
  return <Tree
    treeData={treeData}
    checkable={checkable}
    checkedKeys={checkedKeys}
    onCheck={onCheck}
    defaultCheckedKeys={defaultCheckedKeys}
  />
}

export default {
  component: Tree,
  title: 'Tree',
} as Meta;

// const _default: Story<TreeProps> = (args) => <BaseTree {...args} />;

const _default: Story<TreeProps> = (args: TreeProps) => {
  const [_, updateArgs] = useArgs();
  const handleOnCheck = (newArgs: any) => {
    console.log('newArgs: ', newArgs);
    updateArgs({ ...args, checkedKeys: newArgs })
  }
  return <BaseTree {...args} onCheck={handleOnCheck} />
}

// primary
export const Primary = _default.bind({});

Primary.args = {
  treeData: data,
  checkedKeys: ['0-0-0-0-0'],
  checkable: true,
  defaultCheckedKeys: ['0-0-0-0-0', '0-0-0-0-1'],
}