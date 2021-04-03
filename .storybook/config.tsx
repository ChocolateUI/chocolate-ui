import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "../src/components/alert/style.ts"
import "../src/components/auto-complete/style.ts"
import "../src/components/button/style.ts"
import "../src/components/date-picker/style.ts"
import "../src/components/icon/style.ts"
import "../src/components/input/style.ts"
import "../src/components/menu/style.ts"
import "../src/components/progress/style.ts"
import "../src/components/select/style.ts"
import "../src/components/tabs/style.ts"

library.add(fas)
const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    {/* <h3>组件演示</h3> */}
    {stroyFn()}
  </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);
