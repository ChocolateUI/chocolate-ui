import { TreeSource } from "./tree";



export const data: Array<TreeSource> = [{
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
              name: 'leaf1',
              key: '0-0-0-0-0',
              type: 'file',
              collapsed: false,
              children: []
            },
            {
              name: 'leaf2',
              key: '0-0-0-0-1',
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
      key: '0-0-1',
      type: 'folder',
      collapsed: false,
      children: [
        {
          name: 'leaf3',
          key: '0-0-1-0',
          type: 'file',
          collapsed: false,
          children: []
        }
      ]
    }
  ]
}]

// export const data: TreeSource = {
//   name: 'parent 1',
//   key: '0-0',
//   type: 'folder',
//   collapsed: false,
//   children: [
//     {
//       name: 'parent 1-1',
//       key: '0-0-0',
//       type: 'folder',
//       collapsed: false,
//       children: [
//         {
//           name: 'parent 1-1-1',
//           key: '0-0-0-0',
//           type: 'folder',
//           collapsed: false,
//           children: [
//             {
//               name: 'leaf1',
//               key: '0-0-0-0-0',
//               type: 'file',
//               collapsed: false,
//               children: []
//             },
//             {
//               name: 'leaf2',
//               key: '0-0-0-0-1',
//               type: 'file',
//               collapsed: false,
//               children: []
//             }
//           ]
//         }
//       ]
//     },
//     {
//       name: 'parent 1-2',
//       key: '0-0-1',
//       type: 'folder',
//       collapsed: false,
//       children: [
//         {
//           name: 'leaf3',
//           key: '0-0-1-0',
//           type: 'file',
//           collapsed: false,
//           children: []
//         }
//       ]
//     }
//   ]
// }

// 修改初始数据，以支持多个根结点




const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];