import { TreeSource } from "./tree";

export const data: TreeSource = {
  name: 'parent',
  key: '1',
  type: 'folder',
  collapsed: false,
  children: [
    {
      name: 'parent 1-1',
      key: '1-1',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: 'parent 1-1-1',
          key: '1-1-1',
          type: 'folder',
          collapsed: false,
          children: [
            {
              name: 'leaf1',
              key: '1-1-1-1',
              type: 'file',
              collapsed: false,
              children: []
            },
            {
              name: 'leaf2',
              key: '1-1-1-2',
              type: 'file',
              collapsed: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'parent 1-2',
      key: '1-2',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: 'leaf3',
          key: '1-2-1',
          type: 'file',
          collapsed: false,
          children: []
        }
      ]
    }
  ]
}