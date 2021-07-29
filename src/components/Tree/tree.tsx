import React, { FC, useEffect, useState, useRef, ChangeEvent } from 'react'
import clone from '../../utils/clone'
import { scopedClass } from '../../utils/scopedClass'
import Alert from '../Alert/alert'
import { Key } from './interface'
import TreeNode from './tree-node'
import executeCheck from './utils/execute'
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
  onCheck?: (checked: Key[]) => void;
  onNodeCheck?: (e: ChangeEvent<HTMLInputElement>, key: string) => void,
  checkable: boolean;
  defaultCheckedKeys?: Key[];
  checkedKeys?: Key[];
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

export const Tree: FC<TreeProps> = (props) => {
  const { treeData = [], checkedKeys: propCheckedKeys = [], defaultCheckedKeys = [], onCheck } = props
  const posEntities = useRef<posEntities>({})
  const keyEntities = useRef<keyEntities>({})
  const data = useRef<TreeSource[]>(treeData)
  const [updateData, setUpdateData] = useState(true)
  const [fromNode, setFromNodeState] = useState<TreeSource>()
  const _fromNode = useRef<TreeSource>({} as TreeSource)
  const _toNode = useRef<TreeSource>({} as TreeSource)
  const [show, setShow] = useState(false)
  const [checkedKeysState, setCheckedKeysState] = useState(propCheckedKeys)
  const [dataNode, setDataNode] = useState<DataEntity[]>()
  const firstRender = useRef(true)
  
  useEffect(() => {
    let arr: any = []
    traverseDataNodes(
      data.current,
      item => {
        const { node, index, pos, parentPos, level, key } = item;
        const entity: DataEntity = { node, index, pos, level };
        const mergedKey = getKey(key, pos);
        posEntities.current[pos] = entity;
        keyEntities.current[mergedKey] = entity;
        entity.parent = posEntities.current[parentPos];
        arr.push(entity)
      }
    )
    setDataNode(arr)
  }, [])

  useEffect(() => {
    let checkedKeyEntity;
    if (checkedKeysState && checkedKeysState.length === 0 && firstRender.current) {
      checkedKeyEntity = parseCheckedKeys(defaultCheckedKeys) || {}
      firstRender.current = false
    } else {
      checkedKeyEntity = parseCheckedKeys(checkedKeysState) || {}
      firstRender.current = false
    }
    if (checkedKeyEntity) {
      let { checkedKeys = [] } = checkedKeyEntity
      const conductKeys = executeCheck(checkedKeys, true, keyEntities.current);
      ({ checkedKeys } = conductKeys);
      // dataNode
      dataNode && dataNode.forEach((item: DataEntity, index: number) => {
        const has = checkedKeys.findIndex(ele => ele === item.node.key)
        if(has !== -1) {
          item.node.checked = true
        } else {
          item.node.checked = false
        }
      })
      setUpdateData(!updateData)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedKeysState, defaultCheckedKeys, dataNode])

  const onCollapse = (key: string) => {
    let target = keyEntities.current[key]
    if (target) {
      target.node.collapsed = !target.node.collapsed
      target.node.children = target.node.children || []
      setUpdateData(!updateData)
    }
  }

  const setFromNode = (fromNode: TreeSource) => {
    console.log('fromNode: ', fromNode);
    _fromNode.current = clone(fromNode)
    setFromNodeState(fromNode)
  }

  const onMove = (toNode: TreeSource) => {
    console.log('toNode: ', toNode);
    _toNode.current = clone(toNode)
    const fromNodeIn = keyEntities.current[fromNode.key];
    const toNodeIn = keyEntities.current[toNode.key];
    let fromChildren = fromNodeIn?.parent?.node.children, toChildren = toNodeIn?.parent?.node.children
    console.log('toChildren: ', toChildren);
    console.log('fromChildren: ', fromChildren);
    let fromIndex = fromChildren?.findIndex(item => item.key === fromNode?.key)
    let toIndex = toChildren?.findIndex(item => item.key === toNode?.key)

    if (fromNodeIn?.parent?.node.key === toNodeIn.node.key) {
      setShow(true)
      return
    }
    if (fromIndex !== undefined && toIndex !== undefined) {
      fromChildren?.splice(Number(fromIndex), 1, toNodeIn.node)
      toChildren?.splice(Number(toIndex), 1, fromNodeIn.node)
      setUpdateData(!updateData)
    }
  }

  const handleOnNodeCheck =(e: ChangeEvent<HTMLInputElement>, key: string)=>{
    let checkedObj
    let currKeys: Key[] = []
    let checked: boolean
    if(e.target.checked) {currKeys = [...checkedKeysState, key]; checked = true }
    else {
      currKeys = checkedKeysState.filter(item => item !== key); checked = false 
    }

    let { checkedKeys, halfCheckedKeys } = executeCheck(
      currKeys,
      true,
      keyEntities.current,
    );
    if (!checked) {
      const keySet = new Set(checkedKeys);
      keySet.delete(key);
      ({ checkedKeys, halfCheckedKeys } = executeCheck(
        Array.from(keySet),
        { checked: false, halfCheckedKeys },
        keyEntities.current,
      ));
    }
    checkedObj = checkedKeys;
    setCheckedKeysState(checkedKeys)
    onCheck && onCheck(checkedObj)
  }

  return (
    <div>
      <div className={sc('tree')}>
        <div className={sc('tree-nodes')}>
          {
            data.current.map((item)=>{
              return <TreeNode
                key={item.key}
                data={item}
                onCollapse={onCollapse}
                onNodeCheck={handleOnNodeCheck}
                setFromNode={setFromNode}
                onMove={onMove}
              />
            })
          }
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

