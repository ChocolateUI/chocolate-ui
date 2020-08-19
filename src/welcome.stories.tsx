import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>Chocolate-Ui</h1>
        <p>Chocolate-Ui 即插即用</p>
        <h3>安装试试</h3>
        <code>
          npm install chocolate-ui --save
        </code>
      </>
    )
  }, { info : { disable: true }})
