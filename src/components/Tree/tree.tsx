import React, { FC, useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { scopedClass } from '../../utils/scopedClass'
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

  // const keyToNodeMap = useMemo<KeyToNodeMap>(() => { return {} as KeyToNodeMap } , [])
  const keyToNodeMap = useRef<KeyToNodeMap>({})
  const [data, setData] = useState<TreeSource>(props.treeData)
  const doTranslate = useCallback((children: Array<TreeSource>, parent: TreeSource)=>{
    children.forEach((item: TreeSource) => {
      item.parent = parent
      keyToNodeMap.current[item.key] = item
      if(item.children && item.children.length > 0) {
        doTranslate(item.children, item)
      }
    })
  }, [])

  const copy =(obj: any)=> {
    if (!obj || typeof obj !== 'object') {
        return
    }
    var newObj: any = obj.constructor === Array ? [] : {}
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
              if(key !== 'parent') {
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
    keyToNodeMap.current[data.key] = data
    if(data.children && data.children.length > 0) {
      doTranslate(data.children, data)
    }
  }, [data, doTranslate])

  const onCollapse =(key: string)=>{
    let target = keyToNodeMap.current[key]
    if(target) {
      // 修改 target 就像当于修改了 data
      target.collapsed = !target.collapsed
      target.children = target.children || []
      setData(copy(data))
    }
  }

  const onCheck =(key: string)=>{
    let target: TreeSource = keyToNodeMap.current[key];
    if(target) {
      target.checked = !target.checked
      if(target.checked) {
        checkChildren(target.children, true)
        checkParentCheckAll(target.parent)
      }else {
        checkChildren(target.children, false);
        checkParent(target.parent, false);
      }
      setData(copy(data))
    }
  }

  const checkChildren =(children: Array<TreeSource> = [], checked: boolean)=>{
    children.forEach((item: TreeSource) => {
      item.checked = checked
      checkChildren(item.children, checked)
    })
  }

  const checkParentCheckAll =(parent: TreeSource) => {
    while(parent) {
      parent.checked = parent.children?.every(item=>item.checked)
      parent = parent.parent
    }
  }

  const checkParent =(parent: TreeSource, checked: boolean)=>{
    while(parent) {
      parent.checked = checked
      parent = parent.parent
    }
  }

  return (
    <div className={sc('tree')}> 
      <div className={sc('tree-nodes')}>
        <TreeNode
          data={data}
          onCollapse={onCollapse}
          onCheck={onCheck}
        />
      </div>
    </div>
  )
}

export default Tree;

