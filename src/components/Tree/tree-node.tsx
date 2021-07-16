import React, {FC, useRef, useEffect} from 'react'
import { TreeSource } from './tree';
import Icon from '../icons/icon';
 
interface TreeNodeProps {
  data: TreeSource,
  onCollapse?: (key: string) => void,
  onCheck?: (key: string) => void,
  setFromNode: any,
  onMove: any
}

const TreeNode: FC<TreeNodeProps> =(props)=>{
  const { data: { name, children = [], collapsed = false, key, checked = false }, onCollapse, onCheck, setFromNode, onMove } = props
  const treeNodeRef = useRef<HTMLDivElement>(null)
  const propsData = useRef(props.data)
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

  useEffect(() => {
    const { current } = treeNodeRef;

    const dragStart = (event: DragEvent): void =>{
      console.log('dragstart');
      setFromNode(propsData.current)
      event.stopPropagation();
    }
    const dragEnter = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
    }
    const dragOver = (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
    }

    const drop = (event: DragEvent) => {
      event.preventDefault();
      console.log('move');
      onMove(propsData.current);
      event.stopPropagation();
    }
    current?.addEventListener('dragstart', dragStart, false)
    current?.addEventListener('dragenter', dragEnter, false);
    current?.addEventListener('dragover', dragOver, false);
    current?.addEventListener('drop', drop, false);
    return () => {
      current?.removeEventListener("dragstart", dragStart)
      current?.removeEventListener("dragenter", dragEnter)
      current?.removeEventListener("dragover", dragOver)
      current?.removeEventListener("drop", drop)
    };
  }, [onMove, setFromNode])

  return (
    <div className="node" draggable={true} ref={treeNodeRef}>
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
                <TreeNode 
                  key={item.key} 
                  data={item} 
                  onCollapse={onCollapse} 
                  onCheck={onCheck} 
                  setFromNode={setFromNode} 
                  onMove={onMove}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default TreeNode;