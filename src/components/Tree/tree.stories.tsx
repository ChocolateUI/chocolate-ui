import React from "react";
import { Meta, Story } from "@storybook/react";
import Tree, { TreeProps } from "./tree";
import { singleData, multipleData } from "./data";
import { useArgs } from "@storybook/client-api";
import TreeDoc from './tree-doc.mdx'

const BaseTree = (props: TreeProps) => {
  const {
    treeData,
    checkedKeys,
    onCheck,
    checkable,
    defaultCheckedKeys,
    draggable,
  } = props;
  return (
    <Tree
      treeData={treeData}
      checkable={checkable}
      checkedKeys={checkedKeys}
      onCheck={onCheck}
      defaultCheckedKeys={defaultCheckedKeys}
      draggable={draggable}
    />
  );
};

export default {
  component: Tree,
  title: "Tree",
  parameters: {
    docs: {
      page: TreeDoc,
      source: {
        type: 'code'
      }
    },
    controls: { 
      include: ['checkable'],
      hideNoControlsWarning: true 
    }
  }
} as Meta;

const _default: Story<TreeProps> = (args: TreeProps) => {
  const [_, updateArgs] = useArgs();
  const handleOnCheck = (newArgs: any) => {
    updateArgs({ ...args });
  };
  return <BaseTree {...args} onCheck={handleOnCheck} />;
};

// primary
export const Primary = _default.bind({});

Primary.args = {
  treeData: singleData,
  checkedKeys: [],
  checkable: true,
  defaultCheckedKeys: [],
};

// defaultValue
export const DefaultValue = _default.bind({});

DefaultValue.args = {
  treeData: singleData,
  checkedKeys: [],
  checkable: true,
  defaultCheckedKeys: ["0-0-0-0-0", "0-0-0-0-1"],
};

// multipleParent
export const MultipleParent = _default.bind({});

MultipleParent.args = {
  treeData: multipleData,
  checkedKeys: [],
  checkable: true,
  defaultCheckedKeys: ["0-0-1-0", "0-0-1-1"],
};

// draggable
export const Draggable = _default.bind({});

Draggable.args = {
  treeData: multipleData,
  draggable: true,
  checkedKeys: [],
  defaultCheckedKeys: [],
};
