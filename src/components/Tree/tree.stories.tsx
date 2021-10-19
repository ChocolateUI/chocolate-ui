import React from "react";
import { Meta, Story } from "@storybook/react";
import Tree, { TreeProps } from "./tree";
import { singleData, multipleData } from "./data";
import { useArgs } from "@storybook/client-api";
import TreeDoc from "./tree-doc.mdx";
import Card from "../Card/card";

const BaseTree = (props: TreeProps) => {
  const {
    treeData,
    checkedKeys,
    onCheck,
    checkable,
    defaultCheckedKeys,
    draggable,
  } = props;
  let title = "";
  if (defaultCheckedKeys?.length !== undefined) {
    console.log("draggable: ", draggable);
    if (defaultCheckedKeys.length === 0 && !draggable) {
      title = "基本使用";
    }
    if (defaultCheckedKeys.length === 2) {
      title = "多级父节点";
    }
    if (defaultCheckedKeys.length === 1) {
      title = "默认值";
    }
    if (draggable) {
      title = "支持拖拽";
    }
  }
  return (
    <Card title={title} style={{ width: 500 }} shadow>
      <Tree
        treeData={treeData}
        checkable={checkable}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        defaultCheckedKeys={defaultCheckedKeys}
        draggable={draggable}
      />
    </Card>
  );
};

export default {
  component: Tree,
  title: "Tree 树形控件",
  parameters: {
    docs: {
      page: TreeDoc,
      source: {
        type: "code",
      },
    },
    controls: {
      include: ["checkable"],
      hideNoControlsWarning: true,
    },
  },
} as Meta;

const _default: Story<TreeProps> = (args: TreeProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  draggable: false,
  checkable: true,
  defaultCheckedKeys: [],
};

// defaultValue
export const DefaultValue = _default.bind({});

DefaultValue.args = {
  treeData: singleData,
  checkedKeys: [],
  checkable: true,
  draggable: false,
  defaultCheckedKeys: ["0-0-0-0-1"],
};

// multipleParent
export const MultipleParent = _default.bind({});

MultipleParent.args = {
  treeData: multipleData,
  checkedKeys: [],
  checkable: true,
  draggable: false,
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
