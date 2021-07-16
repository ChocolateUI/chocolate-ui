import React, { FC, useEffect, useState, useCallback, useRef } from 'react'
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


export const Tree: FC<TreeProps> = (props) => {

  const keyToNodeMap = useRef<KeyToNodeMap>({})
  const data = useRef<TreeSource>(props.treeData)
  const [updateData, setUpdateData] = useState(true)
  const [fromNode, setFromNodeState] = useState<TreeSource>()
  const _fromNode = useRef<TreeSource>()
  const _toNode = useRef<TreeSource>()
  const [show, setShow] = useState(false)
  const doTranslate = useCallback((children: Array<TreeSource>, parent: TreeSource) => {
    children.forEach((item: TreeSource) => {
      item.parent = parent
      keyToNodeMap.current[item.key] = item
      if (item.children && item.children.length > 0) {
        doTranslate(item.children, item)
      }
    })
  }, [])

  const copy = (obj: any) => {
    if (!obj || typeof obj !== 'object') {
      return
    }
    var newObj: any = obj.constructor === Array ? [] : {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object') {
          if (key !== 'parent') {
            newObj[key] = copy(obj[key])
          }
        } else {
          newObj[key] = obj[key]
        }
      }
    }
    return newObj
  }

  useEffect(() => {
    keyToNodeMap.current[data.current.key] = data.current
    if (data.current.children && data.current.children.length > 0) {
      doTranslate(data.current.children, data.current)
    }
  }, [updateData, doTranslate])


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

  const checkParentCheckAll = (parent: TreeSource) => {
    while (parent) {
      parent.checked = parent.children?.every(item => item.checked)
      parent = parent.parent
    }
  }

  const checkParent = (parent: TreeSource, checked: boolean) => {
    while (parent) {
      parent.checked = checked
      parent = parent.parent
    }
  }

  const setFromNode = (fromNode: TreeSource) => {
    console.log('fromNode: ', fromNode);
    _fromNode.current = copy(fromNode)
    setFromNodeState(fromNode)
  }

  const onMove = (toNode: TreeSource) => {
    _toNode.current = copy(toNode)
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
      setTimeout(() => {
        setUpdateData(!updateData)
      }, 300);
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

