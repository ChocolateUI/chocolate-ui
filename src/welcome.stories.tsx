import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>Peanut-Cl</h1>
        <p>Peanut-Cl 即插即用</p>
        <h3>安装试试</h3>
        <code>
          npm install peanut-cl --save
        </code>
      </>
    )
  }, { info : { disable: true }})
