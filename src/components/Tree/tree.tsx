import React, {
  FC,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import clone from "../../utils/clone";
import { scopedClass } from "../../utils/scopedClass";
import Message from "../Message/message";
import { Key } from "./interface";
import TreeNode from "./tree-node";
import executeCheck from "./utils/execute";
import parseCheckedKeys from "./utils/parseCheckedKeys";
import traverseDataNodes, { getKey } from "./utils/traverseDataNodes";

const sc = scopedClass("chocolate");

export interface TreeSource {
  name: string;
  key: string;
  type: string;
  collapsed?: boolean;
  children?: Array<TreeSource>;
  parent?: TreeSource;
  checked?: boolean;
}
export interface TreeProps {
  selectedKeys?: string[];
  /**
   * treeNodes 数据，如果设置则不需要手动构造
   * TreeNode 节点（key 在整个树范围内唯一）
   */
  treeData: TreeSource[];
  onCheck?: (checked: Key[]) => void;
  /**
   * 是否可展示 checkbox
   */
  checkable?: boolean;
  /**
   * 默认选中的节点
   */
  defaultCheckedKeys: Key[];
  /**
   * 指定选中的节点，如果是 []，则 defaultCheckedKeys 生效
   */
  checkedKeys?: Key[];
  /**
   * 是否可以拖动对换节点
   */
  draggable?: boolean;
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
  name?: string;
  key?: string;
  type?: string;
}
interface posEntities {
  [key: string]: DataEntity;
}

interface keyEntities {
  [key: string]: DataEntity;
}

export const Tree: FC<TreeProps> = (props) => {
  const {
    treeData = [],
    checkedKeys: propCheckedKeys = [],
    defaultCheckedKeys = [],
    onCheck,
    draggable,
    checkable,
  } = props;
  const posEntities = useRef<posEntities>({});
  const keyEntities = useRef<keyEntities>({});
  const data = useRef<TreeSource[]>(treeData);
  const [updateData, setUpdateData] = useState(true);
  const [fromNode, setFromNodeState] = useState<TreeSource>();
  const _fromNode = useRef<TreeSource>({} as TreeSource);
  const _toNode = useRef<TreeSource>({} as TreeSource);
  const [checkedKeysState, setCheckedKeysState] = useState(propCheckedKeys);
  const [dataNode, setDataNode] = useState<DataEntity[]>();
  const firstRender = useRef(true);
  const [updateKeys, setUpDataKeys] = useState(false);

  useEffect(() => {
    let arr: any = [];
    traverseDataNodes(data.current, (item) => {
      const { node, index, pos, parentPos, level, key } = item;
      const entity: DataEntity = { node, index, pos, level };
      const mergedKey = getKey(key, pos);
      posEntities.current[pos] = entity;
      keyEntities.current[mergedKey] = entity;
      entity.parent = posEntities.current[parentPos];
      arr.push(entity);
    });
    setDataNode(arr);
  }, [updateKeys]);

  const upDataSource = useCallback(() => {
    setUpdateData(!updateData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataNode]);

  useEffect(() => {
    let checkedKeyEntity;
    if (dataNode) {
      if (
        checkedKeysState &&
        checkedKeysState.length === 0 &&
        firstRender.current
      ) {
        checkedKeyEntity = parseCheckedKeys(defaultCheckedKeys) || {};
        firstRender.current = false;
      } else {
        checkedKeyEntity = parseCheckedKeys(checkedKeysState) || {};
        firstRender.current = false;
      }
      setCheckedKeysState(checkedKeyEntity?.checkedKeys || []);
    }

    if (checkedKeyEntity) {
      let { checkedKeys = [] } = checkedKeyEntity;
      const conductKeys = executeCheck(checkedKeys, true, keyEntities.current);
      ({ checkedKeys } = conductKeys);

      dataNode &&
        dataNode.forEach((item: DataEntity, index: number) => {
          const has = checkedKeys.findIndex((ele) => ele === item.node.key);
          if (has !== -1) {
            item.node.checked = true;
          } else {
            item.node.checked = false;
          }
        });
      upDataSource();
    }
  }, [checkedKeysState, defaultCheckedKeys, dataNode, upDataSource]);

  const onCollapse = (key: string) => {
    let target = keyEntities.current[key];
    if (target) {
      target.node.collapsed = !target.node.collapsed;
      target.node.children = target.node.children || [];
      setUpdateData(!updateData);
    }
  };

  const setFromNode = (fromNode: TreeSource) => {
    _fromNode.current = clone(fromNode);
    setFromNodeState(fromNode);
  };

  const onMove = (toNode: TreeSource) => {
    _toNode.current = clone(toNode);
    let fromNodeIn = keyEntities.current[fromNode?.key || ""];
    let toNodeIn = keyEntities.current[toNode.key];
    let fromChildren = fromNodeIn?.parent?.node.children,
      toChildren = toNodeIn?.parent?.node.children;
    let fromIndex = fromChildren?.findIndex(
      (item) => item.key === fromNodeIn?.node.key
    );
    let toIndex = toChildren?.findIndex(
      (item) => item.key === toNodeIn?.node.key
    );

    if (fromNodeIn?.parent?.node.key === toNodeIn.node.key) {
      Message.info({ content: "亲，不能覆盖父节点哈" });
      return;
    }
    if (fromIndex !== undefined && toIndex !== undefined) {
      fromChildren?.splice(Number(fromIndex), 1, toNodeIn.node);
      toChildren?.splice(Number(toIndex), 1, fromNodeIn.node);
      setUpdateData(!updateData);
      setUpDataKeys(!updateKeys);
    }
  };

  const handleOnNodeCheck = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    let checkedObj;
    let currKeys: Key[] = [];
    let checked: boolean;
    if (e.target.checked) {
      currKeys = [...checkedKeysState, key];
      checked = true;
    } else {
      currKeys = checkedKeysState.filter((item) => item !== key);
      checked = false;
    }

    let { checkedKeys, halfCheckedKeys } = executeCheck(
      currKeys,
      true,
      keyEntities.current
    );
    if (!checked) {
      const keySet = new Set(checkedKeys);
      keySet.delete(key);
      ({ checkedKeys, halfCheckedKeys } = executeCheck(
        Array.from(keySet),
        { checked: false, halfCheckedKeys },
        keyEntities.current
      ));
    }
    checkedObj = checkedKeys;
    setCheckedKeysState(checkedKeys);
    onCheck && onCheck(checkedObj);
  };

  return (
    <div>
      <div className={sc("tree")}>
        <div className={sc("tree-nodes")}>
          {data.current.map((item) => {
            return (
              <TreeNode
                key={item.key}
                data={item}
                onCollapse={onCollapse}
                onNodeCheck={handleOnNodeCheck}
                setFromNode={setFromNode}
                onMove={onMove}
                draggable={draggable}
                checkable={checkable}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Tree.defaultProps = {
  treeData: [],
  checkedKeys: [],
  defaultCheckedKeys: [],
  draggable: false,
  checkable: false,
};

export default Tree;
