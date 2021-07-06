<div align="center">
    <img alt="chocolateUi" style={{ width: 180, height: 180 }} src="https://blog-1253646934.cos.ap-beijing.myqcloud.com/chocolate.png" />
    <div >
      <img alt="chocolate-ui" style={{ marginLeft: 10 }} src="https://img.shields.io/npm/dm/chocolate-ui.svg" />
      <img alt="npm" style={{ marginLeft: 10 }} src="https://img.shields.io/npm/v/chocolate-ui.svg?style=flat" />
      <img alt="netlify" style={{ marginLeft: 10 }} src="https://img.shields.io/badge/netlify-Success-blue" />
      <img alt="chromatic" style={{ marginLeft: 10 }} src="https://img.shields.io/badge/chromatic-Success-green" />
    </div>
    <br />
    <p> <span role="img" aria-label="chocolateUi" >🍫</span> Chocolate-Ui 即插即用，纵享丝滑 <span role="img" aria-label="chocolateUi" > 🎗️</span></p>
    <p> 一个 Web 端的 React 组件库 </p>
    <p> 此刻尽丝滑！ </p>
</div>

#### 🐳 预览

<a href="https://master--60e31bd4495b7b003b0b96a3.chromatic.com" target="_blank">chromatic.com</a>

#### ⚡ 安装

>使用 npm

```javascript
npm install chocolate-ui --save
```

>使用 yarn

```javascript
yarn add chocolate-ui
```

#### 📖 使用

> 1 .全部引入

```javascript
// 加载样式
import 'chocolate-ui/dist/styles/index.css'

// 引入组件
import { Button } from 'chocolate-ui'
```

> 2 .按需加载

```js
import Button from 'chocolate-ui/dist/components/button';
import 'chocolate-ui/dist/components/button/style';
```

> 3 .使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

```js
// .babelrc.js
module.exports = {
  plugins: [
    ["babel-plugin-import", {
      "libraryName": 'chocolate-ui',
      "libraryDirectory": "dist/components",
      "style": true
    },'cuke-ui'], 
  ]
}
```

#### ✨ 技术栈

* 😁 typescript with React Hooks
* 🍑 使用 react-testing-library 完成单元测试
* 🦌 使用 storybook 本地调试和生成文档页面
* 🥦 使用 react-doc-gen 自动生成文档
* 🥭 使用第三方库扩充组件-(react-fontawesome, react-transition-group)

#### 🎋 一些命令行

~~~bash
// 启动本地环境
npm run stroybook

// 单元测试
npm test

// build 可发布静态文件
npm run build

//发布到 npm
npm run publish
~~~
