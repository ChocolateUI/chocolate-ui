import { Key } from "../interface"

/**
 * 将 `checkedKeys` 转换为 { checkedKeys } 样式，后续会支持部分选中 halfCheckedKeys
 */
const parseCheckedKeys =(keys: Key[]) => {
  if (!keys) {
    return null;
  }
  let keyProps;
  if(Array.isArray(keys)) {
    keyProps = {
      checkedKeys: keys,
    };
  } else {
    console.warn(false, '`checkedKeys` is not an array');
    return null;
  }
  return keyProps;
}

export default parseCheckedKeys;