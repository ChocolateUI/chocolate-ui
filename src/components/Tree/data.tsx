import { TreeSource } from "./tree";

// 单个父节点
export const singleData: Array<TreeSource> = [{
  name: 'parent 1',
  key: '0-0',
  type: 'folder',
  collapsed: false,
  children: [
    {
      name: 'parent 1-1',
      key: '0-0-0',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: 'parent 1-1-1',
          key: '0-0-0-0',
          type: 'folder',
          collapsed: false,
          children: [
            {
              name: 'leaf 1-1-1-0',
              key: '0-0-0-0-0',
              type: 'file',
              collapsed: false,
              children: []
            },
            {
              name: 'parent 1-1-1-0',
              key: '0-0-0-0-1',
              type: 'folder',
              collapsed: false,
              children: [
                {
                  name: 'leaf 1-1-1-0-0',
                  key: '0-0-0-0-1-0',
                  type: 'file',
                  collapsed: false,
                  children: []
                },
                {
                  name: 'leaf 1-1-1-0-1',
                  key: '0-0-0-0-1-1',
                  type: 'file',
                  collapsed: false,
                  children: []
                },
                {
                  name: 'leaf 1-1-1-0-2',
                  key: '0-0-0-0-1-2',
                  type: 'file',
                  collapsed: false,
                  children: []
                },
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'parent 1-1',
      key: '0-0-1',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: 'leaf 1-1-0',
          key: '0-0-1-0',
          type: 'file',
          collapsed: false,
          children: []
        },
        {
          name: 'leaf 1-1-1',
          key: '0-0-1-1',
          type: 'file',
          collapsed: false,
          children: []
        }
      ]
    }
  ]
}]

// 多个父节点
export const multipleData: Array<TreeSource> = [{
  name: 'parent 1',
  key: '0-0',
  type: 'folder',
  collapsed: false,
  children: [
    {
      name: 'parent 1-1',
      key: '0-0-0',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: 'parent 1-1-1',
          key: '0-0-0-0',
          type: 'folder',
          collapsed: false,
          children: [
            {
              name: 'leaf 1-1-1-0',
              key: '0-0-0-0-0',
              type: 'file',
              collapsed: false,
              children: []
            },
            {
              name: 'parent 1-1-1-0',
              key: '0-0-0-0-1',
              type: 'folder',
              collapsed: false,
              children: [
                {
                  name: 'leaf 1-1-1-0-0',
                  key: '0-0-0-0-1-0',
                  type: 'file',
                  collapsed: false,
                  children: []
                },
                {
                  name: 'leaf 1-1-1-0-1',
                  key: '0-0-0-0-1-1',
                  type: 'file',
                  collapsed: false,
                  children: []
                },
                {
                  name: 'leaf 1-1-1-0-2',
                  key: '0-0-0-0-1-2',
                  type: 'file',
                  collapsed: false,
                  children: []
                },
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'parent 1-1',
      key: '0-0-1',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: 'leaf 1-1-0',
          key: '0-0-1-0',
          type: 'file',
          collapsed: false,
          children: []
        },
        {
          name: 'leaf 1-1-1',
          key: '0-0-1-1',
          type: 'file',
          collapsed: false,
          children: []
        }
      ]
    }
  ]
},
{
  name: 'parent 2',
  key: '0-1',
  type: 'folder',
  collapsed: false,
  children: [
    {
      name: 'parent 2-1',
      key: '0-1-0',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: 'parent 2-1-0',
          key: '0-1-0-0',
          type: 'folder',
          collapsed: false,
          children: [
            {
              name: 'leaf 2-1-0-0',
              key: '0-1-0-0-0',
              type: 'file',
              collapsed: false,
              children: []
            },
            {
              name: 'leaf 2-1-0-1',
              key: '0-1-0-0-1',
              type: 'file',
              collapsed: false,
              children: []
            },
          ]
        }
      ]
    },
  ]
}]