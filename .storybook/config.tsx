import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "../src/components/Alert/_style.scss"
import "../src/components/AutoComplete/_style.scss"
import "../src/components/Button/_style.scss"
import "../src/components/DatePicker/_style.scss"
import "../src/components/Icon/_style.scss"
import "../src/components/Input/_style.scss"
import "../src/components/Menu/_style.scss"
import "../src/components/Progress/_style.scss"
import "../src/components/Select/_style.scss"
import "../src/components/Tabs/_style.scss"

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
