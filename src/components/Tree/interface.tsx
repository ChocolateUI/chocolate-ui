import { TreeProps } from "./tree";

export type Key = string | number;
export type GetCheckDisabled<RecordType> = (record: RecordType) => boolean;
export interface DataNode {
  checkable?: boolean;
  children?: DataNode[];
  key: string | number;
  title?: React.ReactNode;
}

export type NodeElement = React.ReactElement<TreeProps> & {
  selectHandle?: HTMLSpanElement;
  type: {
    isTreeNode: boolean;
  };
};


export interface Entity {
  node: NodeElement;
  index: number;
  key: Key;
  pos: string;
  parent?: Entity;
  children?: Entity[];
}
export interface DataEntity extends Omit<Entity, 'node' | 'parent' | 'children'> {
  node: DataNode;
  parent?: DataEntity;
  children?: DataEntity[];
  level: number;
}