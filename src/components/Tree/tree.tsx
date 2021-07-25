import React, { FC, useEffect, useState, useCallback, useRef } from 'react'
import clone from '../../utils/clone'
import { scopedClass } from '../../utils/scopedClass'
import Alert from '../Alert/alert'
import { Key } from './interface'
import TreeNode from './tree-node'
import parseCheckedKeys from './utils/parseCheckedKeys'
import traverseDataNodes, { getKey } from './utils/traverseDataNodes'

const sc = scopedClass('chocolate')

export interface TreeSource {
  name: string;
  key: string;
  type: string;
  collapsed?: boolean;
  children?: Array<TreeSource>;
  parent?: TreeSource;
  checked?: boolean;
  // keyEntities: Record<Key, DataEntity>;
}


interface KeyToNodeMap {
  [key: string]: TreeSource
}
export interface TreeProps {
  selectedKeys?: string[];
  /**
   * treeNodes 数据，如果设置则不需要手动构造
   * TreeNode 节点（key 在整个树范围内唯一）
   */
  treeData: TreeSource[];
  onCheck?: (checked: { checked: Key[]; halfChecked: Key[] } | Key[]) => void;
  checkable: boolean;
  defaultCheckedKeys?: Key[];
  checkedKeys?: Key[] | { checked: Key[]; halfChecked: Key[] };
}

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
  parent?: DataEntity;
  name: string;
  key: string;
  type: string;
}
interface posEntities {
  [key: string]: DataEntity
}

interface keyEntities {
  [key: string]: DataEntity
}

interface treeState {

}

export const Tree: FC<TreeProps> = (props) => {
  const { treeData = [], checkable = false, checkedKeys = [], defaultCheckedKeys = [] } = props
  const keyToNodeMap = useRef<KeyToNodeMap>({})
  const posEntities = useRef<posEntities>({})
  const keyEntities = useRef<keyEntities>({})
  const data = useRef<TreeSource[]>(treeData)
  const [updateData, setUpdateData] = useState(true)
  const [fromNode, setFromNodeState] = useState<TreeSource>()
  const _fromNode = useRef<TreeSource>({} as TreeSource)
  const _toNode = useRef<TreeSource>({} as TreeSource)
  const [show, setShow] = useState(false)

  useEffect(() => {
    traverseDataNodes(
      data.current,
      item => {
        const { node, index, pos, parentPos, level, key } = item;
        const entity: DataEntity = { node, index, pos, level };
        const mergedKey = getKey(key, pos);
        posEntities.current[pos] = entity;
        keyEntities.current[mergedKey] = entity;

        entity.parent = posEntities.current[parentPos];
        console.log('posEntities.curren: ', posEntities.current);

        // console.log('keyEntities: ', keyEntities.current);

      }
    )
  }, [])

  useEffect(() => {
    let checkedKeyEntity;
    if (defaultCheckedKeys.length !== 0) {
      checkedKeyEntity = parseCheckedKeys(defaultCheckedKeys) || {}
    } else {
      checkedKeyEntity = parseCheckedKeys(checkedKeys) || {}
    }

    if (checkedKeyEntity) {
      let { checkedKeys = [], halfCheckedKeys = [] } = checkedKeyEntity
      checkedKeys.forEach(item => {
        const target = keyEntities.current[item]
        if (target) {
          target.node.checked = !target.node.checked
          setUpdateData(!updateData)
        }
      })
    }
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
    let target: TreeSource = posEntities.current[key];
    if (target) {
      target.node.checked = !target.node.checked
      if (target.node.checked) {
        checkChildren(target.node.children, true)
        checkParentCheckAll(target?.parent)
      } else {
        console.log('object');
        checkChildren(target.node.children, false);
        checkParent(target?.parent, false);
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
      parent.node.checked = parent?.node?.children?.every(item => item.checked)
      parent = parent?.parent as TreeSource
    }
  }

  const checkParent = (parent: TreeSource = {} as TreeSource, checked: boolean) => {
    while (parent) {
      parent.node.checked = checked
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

