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

<a href="https://master--60e31bd4495b7b003b0b96a3.chromatic.com" target="_blank">chocolate-ui.com</a>

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
import "chocolate-ui/dist/components/index.css";

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
    [
      'babel-plugin-import',
      {
        libraryName: 'chocolate-ui',
        libraryDirectory: 'dist/components',
        style: true  // 导入 CSS 源文件，可以在编译期间进行优化
      }
    ], 
  ]
}
```

#### 😊 谁在使用

- 我自己的 hooks 集合 -> [chocolate-hooks](https://github.com/ChocolateUI/chocolate-hooks)

#### ✨ 技术栈

- 😁 全部组件由 `TypeScript with React Hooks` 编写
- 🍑 使用 `react-testing-library` 完成单元测试
- 🦌 使用 `Storybook` 本地调试和生成文档页面
- ⚙️ 组件库使用 `TSC` 编译 `TS` 和 `Gulp` 打包 `CSS`
- 🥦 CI/CD：使用 `Chromatic` + `GitActions` 持续集成和部署

#### 🔨 部署

![chromatic](https://user-images.githubusercontent.com/18121040/132154705-126869b5-fa9b-4ea8-80fd-f6aba5c81288.png)
