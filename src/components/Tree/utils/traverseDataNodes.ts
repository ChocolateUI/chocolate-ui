import { Key } from "../interface";
import { TreeSource } from "../tree";

function getPosition(level: string | number, index: number) {
  return `${level}-${index}`;
}

export function getKey(key: Key, pos: string) {
  if (key !== null && key !== undefined) {
    return key;
  }
  return pos;
}


// 通过 treeSource 转换所有数据
const traverseDataNodes = (
  dataNode: Array<TreeSource>,
  callBack: (data:  {
    node: TreeSource;
    index: number;
    pos: string;
    key: Key;
    parentPos: Key;
    level: number;
  }) => void
)=>{
  function processNode(
    node: TreeSource,
    index?: number,
    parent?: { node: TreeSource; pos: string; level: number },
  ) {
    // const { children = [] } = dataNode
    const children = node ? node['children'] : dataNode;
    const pos = node ? getPosition(parent?.pos, index) : '0';
    let syntheticGetKey: (node: TreeSource, pos?: string) => Key;
    syntheticGetKey = (node, pos) => getKey(node['key'], pos as string);

    if(node) {
      const key: Key = syntheticGetKey(node, pos);
      
      const data = {
        node,
        index,
        pos,
        key,
        parentPos: parent.node ? parent.pos : null,
        level: parent?.level + 1
      }
      callBack(data);
    }

    if(children && children.length > 0) {
      children.forEach((subNode, subIndex) =>{
        processNode(subNode, subIndex, {
          node,
          pos,
          level: parent ? parent.level + 1 : -1
        })
      })
    }
  }

  processNode(null);
}

export default traverseDataNodes