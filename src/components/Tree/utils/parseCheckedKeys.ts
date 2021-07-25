import { Key } from "../interface"

/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */
const parseCheckedKeys =(keys: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
  if (!keys) {
    return null;
  }
  let keyProps;
  if(Array.isArray(keys)) {
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined,
    };
  } else if (typeof keys === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined,
    };
  } else {
    console.warn(false, '`checkedKeys` is not an array or an object');
    return null;
  }
  return keyProps;
}

export default parseCheckedKeys;