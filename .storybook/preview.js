import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import "../src/styles/index.scss"

library.add(fas)
const wrapperStyle = {
  padding: '20px 40px',
}
const storyWrapper = (stroyFn) => {
  return <div style={wrapperStyle}>
  {stroyFn()}
</div>
}

// 通过addDecorator添加插件
addDecorator(storyWrapper)
addDecorator(withInfo)
// addParameters(
//   {
//     info: { 
//       inline: true, // 直接展示所有信息
//       header: false, // 隐藏组件名称和组件描述
//       source: true,
//     }
//     ,
//     options: {
//       name: 'Chocolate-ui',
//       panelPosition: 'right',
//       isFullscreen: false,
//       showNav: true,
//       showPanel: true,
//       sortStoriesByKind: false,
//       sidebarAnimations: true,
//       enableShortcuts: true,
//       isToolshown: true,
//     }
//   },
// )

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#FFFFFF',
      },
      {
        name: 'dark',
        value: '#000000',
      },
    ],
  },
};

// export const globalTypes = {
//   theme: {
//     name: 'Theme',
//     description: 'Global theme for components',
//     defaultValue: 'light',
//     toolbar: {
//       icon: 'circlehollow',
//       // Array of plain string values or MenuItem shape (see below)
//       items: ['light', 'dark'],
//       // Property that specifies if the name of the item will be displayed
//       showName: True,
//     },
//   },
// };

// 将 welcome 文档说明置于顶部
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};

configure(loaderFn, module);

