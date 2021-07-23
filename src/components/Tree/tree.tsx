import React, { FC, useEffect, useState, useCallback, useRef } from 'react'
import clone from '../../utils/clone'
import { scopedClass } from '../../utils/scopedClass'
import Alert from '../Alert/alert'
import TreeNode from './tree-node'

const sc = scopedClass('chocolate')

export interface TreeSource {
  name: string,
  key: string,
  type: string,
  collapsed?: boolean,
  children?: Array<TreeSource>,
  parent?: TreeSource
  checked?: boolean
}

interface KeyToNodeMap {
  [key: string]: TreeSource
}

export interface TreeProps {
  selectedKeys?: string[],
  /**
   * treeNodes 数据，如果设置则不需要手动构造
   * TreeNode 节点（key 在整个树范围内唯一）
   */
  treeData: TreeSource
}

export type Key = string | number;

export type NodeElement = React.ReactElement<TreeProps> & {
  selectHandle?: HTMLSpanElement;
  type: {
    isTreeNode: boolean;
  };
};

export interface DataEntity {
  node: TreeSource;
  index: number;
  pos: string;
  // key: Key;
  // parentPos: Key;
  level: number;
  parent?: DataEntity
}
interface posEntities {
  [key: string]: DataEntity
}

function getPosition(level: string | number, index: number) {
  return `${level}-${index}`;
}

export const Tree: FC<TreeProps> = (props) => {

  const keyToNodeMap = useRef<KeyToNodeMap>({})
  const posEntities = useRef<posEntities>({})
  const data = useRef<TreeSource>(props.treeData)
  const [updateData, setUpdateData] = useState(true)
  const [fromNode, setFromNodeState] = useState<TreeSource>()
  const _fromNode = useRef<TreeSource>({} as TreeSource)
  const _toNode = useRef<TreeSource>({} as TreeSource)
  const [show, setShow] = useState(false)
  // 通过 treeSource 转换所有数据
  const traverseDataNodes = (
    dataNode: TreeSource,
    callBack: (data:  {
      node: TreeSource;
      index: number;
      pos: string;
      // key: Key;
      parentPos: Key;
      level: number;
    }) => void
  )=>{

    function processNode(
      node: TreeSource,
      index?: number,
      parent?: { node: TreeSource; pos: string; level: number },
    ) {
      // const { children = [] } = dataNode
      const children = node ? node['children'] : dataNode['children'];
      console.log('children: ', children);
      const pos = node ? getPosition(parent?.pos, index) : '0-0';

      if(node) {
        // const key: Key
        const data = {
          node,
          index,
          pos,
          // key,
          parentPos: parent.node ? parent.pos : null,
          level: parent?.level + 1
        }
        callBack(data);
      }

      if(children && children.length > 0) {
        children.forEach((subNode, subIndex) =>{
          processNode(subNode, subIndex, {
            node,
            pos,
            level: parent ? parent.level + 1 : -1
          })
        })
      }
    }

    processNode(null);
  }

  useEffect(() => {
    traverseDataNodes(
      data.current,
      item => {
        const { node, index, pos, parentPos, level } = item;
        const entity: DataEntity = { node, index, pos, level };
        posEntities.current[pos] = entity;
        entity.parent = posEntities.current[parentPos];
        console.log('entity: ', entity);

      }
    )
  }, [])

  const onCollapse = (key: string) => {
    let target = keyToNodeMap.current[key]
    if (target) {
      // 修改 target 就像当于修改了 data
      target.collapsed = !target.collapsed
      target.children = target.children || []
      setUpdateData(!updateData)
    }
  }

  const onCheck = (key: string) => {
    let target: TreeSource = keyToNodeMap.current[key];
    // console.log('target: ', target);
    if (target) {
      target.checked = !target.checked
      if (target.checked) {
        checkChildren(target.children, true)
        checkParentCheckAll(target.parent)
      } else {
        checkChildren(target.children, false);
        checkParent(target.parent, false);
      }
      setUpdateData(!updateData)
    }
  }

  const checkChildren = (children: Array<TreeSource> = [], checked: boolean) => {
    children.forEach((item: TreeSource) => {
      item.checked = checked
      checkChildren(item.children, checked)
    })
  }

  const checkParentCheckAll = (parent: TreeSource = {} as TreeSource) => {
    while (parent) {
      parent.checked = parent.children?.every(item => item.checked)
      parent = parent.parent as TreeSource
    }
  }

  const checkParent = (parent: TreeSource = {} as TreeSource, checked: boolean) => {
    while (parent) {
      parent.checked = checked
      parent = parent.parent as TreeSource
    }
  }

  const setFromNode = (fromNode: TreeSource) => {
    _fromNode.current = clone(fromNode)
    setFromNodeState(fromNode)
  }

  const onMove = (toNode: TreeSource) => {
    _toNode.current = clone(toNode)
    let fromChildren = fromNode?.parent?.children, toChildren = toNode?.parent?.children
    let fromIndex = fromChildren?.findIndex(item => item.key === fromNode?.key)
    let toIndex = toChildren?.findIndex(item => item.key === toNode?.key)

    if (fromNode?.parent?.key === toNode.key) {
      setShow(true)
      return
    }
    if (fromIndex !== undefined && toIndex !== undefined) {
      fromChildren?.splice(Number(fromIndex), 1, _toNode.current)
      toChildren?.splice(Number(toIndex), 1, _fromNode.current)
      setUpdateData(!updateData)
    }
  }

  return (
    <div>
      <div className={sc('tree')}>
        <div className={sc('tree-nodes')}>
          <TreeNode
            data={data.current}
            onCollapse={onCollapse}
            onCheck={onCheck}
            setFromNode={setFromNode}
            onMove={onMove}
          />
        </div>
      </div>
      {
        show &&
        <div style={{ position: 'relative', top: 0 }}>
          <Alert message="提示" description="亲，不能覆盖父节点哦" type="default" />
        </div>
      }
    </div>
  )
}

export default Tree;

