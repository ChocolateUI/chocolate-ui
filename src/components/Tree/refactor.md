### 优化思路

循环引用 `item.parent = parent`
现象： 发现每次切换 `storybook` 的 tab 的时候，都会包一个错误 `max...`,  也就是栈溢出
起初以为是 平台的 bug，但经过提交 github issue 发现确实是自己代码的问题。
  什么问题呢？在遍历 children 的时候，为 DataNode 新增 parent 属性，它的值
  指向 这个 DataNode 的父节点，而这个父节点其实就是 DataNode 的上层节点，
  所以出现了循环引用。
如何解决这个问题？
  - 我首先想到的是去断开这个引用，所以将 parent 的值去做一份深拷贝，但是发现当遇到刚刚新增好的 parent 属性时，会进行不断地递归调用，造成了浏览器卡死，我忽然发现其实不适合做深拷贝的
  - 第二种方式就是对自己的代码进行重构。于是尝试着去阅读 antd 的关于 rc-tree 的源码。发现它是的巧妙之处：用 pos 来保存当前 DataNode 的位置，其实就是 每个 DataNode 的 key 值；用 parentPos 来保存它父节点的 key，而不是一次性把整个父节点都保存。然后在需要对 DataNode 新增 parent 的位置，通过 posEntities[parentPos] 来赋值，posEntities 实体保存了节点所有的 pos 值

然后阅读源码的过程中，发现 tree 实现的有问题：
  - 没有暴露出 onCheck 接口去让用户去设置 checkbox。第一版的设计仅仅是通过 data，来映射出 tree 节点，然后可以实现 折叠/checkbox/拖拽，但如果作为单独组件导出将不支持回调。最终引入 `onCheck` 来解决
  - 不支持默认选中。引入了 `defaultCheckedKeys` 来解决

#### 优化checkbox选择逻辑

通过暴露 onChange 接口，让用户使用通过 keys 来控制组件的事件。