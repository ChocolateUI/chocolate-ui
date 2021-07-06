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
          <img alt="chocolateUi" style={{ width: 144, height: 23, marginLeft: 10 }} src="https://img.shields.io/npm/dm/chocolate-ui.svg" />
          <img alt="chocolateUi" style={{ width: 95, height: 23, marginLeft: 10 }} src="https://badgen.net/npm/v/chocolate-ui/" />
          <img alt="chocolateUi" style={{ width: 142, height: 23, marginLeft: 10 }} src="https://api.netlify.com/api/v1/badges/45fb5b8b-392a-4a4a-8731-fb3a4cc6d14c/deploy-status" />
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