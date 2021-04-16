import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import "../src/styles/index.scss"
import "../src/components/alert/style";

library.add(fas)
const wrapperStyle = {
  padding: '20px 40px',
  width: '500px'
}
const storyWrapper = (stroyFn) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})

// const loaderFn = () => {
//   return [
//     require('../src/welcome.stories'),
//     require('../src/stories/1-Button.stories'),
//   ]
// }

const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);

