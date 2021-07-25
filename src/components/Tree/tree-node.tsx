import React, { FC, useRef, useEffect } from 'react'
import { TreeSource } from './tree';
import Icon from '../icons/icon';

interface TreeNodeProps {
  data: TreeSource[],
  onCollapse?: (key: string) => void,
  onCheck?: (key: string) => void,
  setFromNode: any,
  onMove: any
}

const TreeNode: FC<TreeNodeProps> = (props) => {
  const { data, onCollapse, onCheck, setFromNode, onMove } = props

  // { name, children = [], collapsed = false, key, checked = false }
  const treeNodeRef = useRef<HTMLDivElement>(null)
  const propsData = useRef(props.data)

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
    return {caret, icon}
  }

  const renderCheckBox = (checked: boolean, key: string, name: string) => {
    return (
      <span className="content">
        <input type="checkbox" style={{ marginRight: 8 }} checked={checked} onChange={() => onCheck && onCheck(key)} ></input>
        {/* {icon} */}
        {name}
      </span>
    )
  }

  useEffect(() => {
    const { current } = treeNodeRef;

    const dragStart = (event: DragEvent): void => {
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
    (data && data.length > 0) && (
      <>
        {
          data.map((item: TreeSource) => {
            const { children = [], name, checked = false, key, collapsed = false } = item
            return (
              <div className="node" draggable={true} ref={treeNodeRef} key={key}>
                <div className="inner">
                  {renderWidgets(children, collapsed, key).caret}
                  {renderCheckBox(checked, key, name)}
                </div>
                {
                  children && children?.length ? (
                    <div className="children">
                      <TreeNode
                        key={item.key}
                        data={children}
                        onCollapse={onCollapse}
                        onCheck={onCheck}
                        setFromNode={setFromNode}
                        onMove={onMove}
                      />
                    </div>
                  ) : null}
              </div>
            )
          })
        }
      </>
    )
  )
}

export default TreeNode;