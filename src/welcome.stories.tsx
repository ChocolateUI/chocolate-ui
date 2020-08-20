import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>Chocolate-Ui</h1>
        <span role="img" aria-label='chocolate'> 🍫 Chocolate-Ui 即插即用，纵享丝滑 🎗️</span>
        <h3>安装试试</h3>
        <code>
          npm install chocolate-ui --save
        </code>
      </>
    )
  }, { info : { disable: true }})
