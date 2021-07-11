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

// 通过 addDecorator 添加插件
addDecorator(storyWrapper)

export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#FFFFFF',
      },
      // {
      //   name: 'dark',
      //   value: '#000000',
      // },
    ],
  },
  controls: { expanded: false }, // 在 Controls 中展示 description
};

// 将 welcome 文档说明置于顶部
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};

configure(loaderFn, module);

