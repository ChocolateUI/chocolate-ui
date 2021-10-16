#### ⚡ 安装

>使用 npm

`
npm install chocolate-ui --save
`

>使用 yarn

`
yarn add chocolate-ui
`

#### 📖 使用

1、引入

`// 加载样式
import 'chocolate-ui/dist/index.css'`

`// 引入组件
import { Button } from 'chocolate-ui'`

2、按需加载

`
import Button from 'chocolate-ui/dist/components/button';
`

`
import 'chocolate-ui/dist/components/button/style';
`

3、使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

~~~js
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
~~~

#### 🚗 Tips

>在每个组件展示页右边的 `Controls` 栏中，可以查看组件的不同形态

#### ✨ 技术栈

- 😁 全部组件由 Typescript with React Hooks 编写
- 🍑 使用 `react-testing-library` 完成单元测试
- 🦌 使用 `Storybook` 本地调试和生成文档页面
- ⚙️ 组件库打包使用 `Webpack` 和 `Gulp`
- 🥦 CI/CD：使用 `Chromatic` + `GitActions` 持续集成和部署

#### 😊 谁在使用

- 我自己的 hooks 集合 -> [chocolate-hooks](https://github.com/ChocolateUI/chocolate-hooks)
