import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const defaultButton = () => (
  <Button onClick={action('clicked')}> default </Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg"> large </Button>
    <Button size="sm" style={{ marginLeft: 20 }}> small </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary </Button>
    <Button btnType="danger" style={{ marginLeft: 20 }}> danger </Button>
    <Button btnType="link" href="https://google.com" style={{ marginLeft: 20 }}> link </Button>
  </>
)
storiesOf('Button 按钮', module)
  .add('默认样式', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)