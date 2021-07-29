import React, { FC, useRef, useEffect, ChangeEvent } from 'react'
import { TreeSource } from './tree';
import Icon from '../icons/icon';
import { Key } from './interface';

interface TreeNodeProps {
  data: TreeSource;
  onCollapse?: (key: string) => void;
  onNodeCheck?: (e: ChangeEvent<HTMLInputElement>, key: string, isLeaf?: boolean) => void,
  onCheck?: (checked: { checked: Key[]; halfChecked: Key[] } | Key[]) => void;
  setFromNode: any;
  onMove: any;
}

const TreeNode: FC<TreeNodeProps> = (props) => {
  const { data, onCollapse, setFromNode, onMove, onNodeCheck } = props
  const treeNodeRef = useRef<HTMLDivElement>(null)
  const propsData = useRef(data)
  const { data: { children = [], name, checked = false, key, collapsed = false, type = '' } } = props

  const renderWidgets = (children: TreeSource[], collapsed: boolean, key: string) => {
    let caret, icon;
    if (children) {
      if (children.length > 0) {
        caret = (
          <span className={`collapse ${collapsed ? 'caret-right' : 'caret-down'}`} onClick={() => onCollapse && onCollapse(key)} />
        )
        icon = collapsed ? <Icon icon="file" /> : <Icon icon="folder-open" />
      } else {
        caret = null
        icon = <Icon icon="folder" />
      }
    } else {
      caret = (
        <span className={'collapse caret-right'}
          onClick={() => onCollapse && onCollapse(key)}
        />
      )
      icon = <Icon icon="folder-minus" />
    }
    return { caret, icon }
  }

  const renderCheckBox = (checked: boolean, key: string, name: string, type: string) => {
    return (
      <span className="content">
        <input type="checkbox" style={{ marginRight: 8 }} checked={checked} onChange={
          (e) => {
            onNodeCheck && onNodeCheck(e, key, type === 'file')
          }
        } ></input>
        {/* {icon} */}
        {name}
      </span>
    )
  }

  useEffect(() => {
    const { current } = treeNodeRef;

    const dragStart = (event: DragEvent): void => {
      console.log('event: ', event.target);
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
    <div className="node" draggable={true} ref={treeNodeRef} key={key}>
      <div className="inner">
        {renderWidgets(children, collapsed, key).caret}
        {renderCheckBox(checked, key, name, type)}
      </div>
      {
        (children && children.length && !collapsed) ? (
          <div className="children">
            {
              children.map((item: TreeSource) => (
                <TreeNode
                  key={item.key}
                  data={item}
                  onCollapse={onCollapse}
                  setFromNode={setFromNode}
                  onNodeCheck={onNodeCheck}
                  onMove={onMove}
                />
              ))
            }
          </div>
        ) : null
      }
    </div>
  )
}
// {
//   (children && children.length > 0 && !collapsed) && (
//     <div className="children">
//       {
//         children.map((item: TreeSource) => (
//           <TreeNode 
//             key={item.key} 
//             data={item} 
//             onCollapse={onCollapse} 
//             onCheck={onCheck} 
//             setFromNode={setFromNode} 
//             onMove={onMove}
//           />
//         ))
//       }
//     </div>
//   )
export default TreeNode;