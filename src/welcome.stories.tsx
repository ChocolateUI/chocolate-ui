import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>Peanuts-Ui</h1>
        <p>Peanuts-Ui 即插即用</p>
        <h3>安装试试</h3>
        <code>
          npm install Peanuts-Ui --save
        </code>
      </>
    )
  }, { info : { disable: true }})