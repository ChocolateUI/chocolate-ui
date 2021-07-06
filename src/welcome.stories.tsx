import React from 'react'
import { storiesOf } from '@storybook/react'
import ReactMarkDown from "react-markdown"
import { FaGithub } from "react-icons/fa"
import Introduction from './introduction.md'
import { name, repository } from "../package.json"
import "./styles/welcome.scss"

storiesOf('Welcome page', module)
  .add("介绍", () => (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ fontSize: 40, padding: 0, margin: 0, color: '#F5BF2F' }}>
          {name}
          <a href={repository.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 20 }}>
            <FaGithub style={{ fontSize: 30, color: "#444" }} />
          </a>
        </div>
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
      <ReactMarkDown
          source={Introduction}
          // renderers={{
          //   CodeBlock,
          //   Code: CodeBlock
          // }}
        />
    </>
  ), { info: { disable: true } })