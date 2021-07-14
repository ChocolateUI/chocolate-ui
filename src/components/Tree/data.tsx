import { TreeSource } from "./tree";

export const data: TreeSource = {
  name: '父亲',
  key: '1',
  type: 'folder',
  collapsed: false,
  children: [
    {
      name: '儿子1',
      key: '1-1',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: '孙子1',
          key: '1-1-1',
          type: 'folder',
          collapsed: false,
          children: [
            {
              name: '重孙1',
              key: '1-1-1-1',
              type: 'file',
              collapsed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      name: '儿子2',
      key: '1-2',
      type: 'folder',
      collapsed: true
    }
  ]
}