import React, {FC} from 'react'
import { TreeSource } from './tree';
import { scopedClass } from '../../utils/scopedClass'
import Icon from '../icons/icon';
 
const sc = scopedClass('chocolate-tree-nodes')
const scIn = scopedClass('chocolate-tree-nodes-node-inner')

interface TreeNodeProps {
  data: TreeSource,
  onCollapse?: (key: string) => void,
  onCheck?: (key: string) => void,
}

const TreeNode: FC<TreeNodeProps> =(props)=>{
  const { data: { name, children, collapsed = false, key, checked = false }, onCollapse, onCheck } = props

  let caret, icon;

  if(children) {
    if(children.length > 0) {
      caret = (
        <span className={`collapse ${collapsed ? 'caret-right' : 'caret-down'}`} onClick={()=> onCollapse && onCollapse(key)} />
      )
      icon = collapsed ? <Icon icon="file" /> : <Icon icon="folder-open" />
    } else {
      caret = null
      icon =  <Icon icon="folder" /> 
    }
  }else {
    caret = (
        <span className={'collapse caret-right'}
            onClick={() => onCollapse && onCollapse(key)}
        />
    )
    icon = <Icon icon="folder-minus" />
  }
  return (
    <div className="node">
      <div className="inner">
        {caret}
        <span className="content">
          <input type="checkbox" style={{ marginRight: 8 }} checked={checked} onChange={() => onCheck && onCheck(key)} ></input>
          {/* {icon} */}
          {name}
        </span>
      </div>
      {
        (children && children.length > 0 && !collapsed) && (
          <div className="children">
            {
              children.map((item: TreeSource) => (
                <TreeNode key={item.key} data={item} onCollapse={onCollapse} onCheck={onCheck} />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default TreeNode;