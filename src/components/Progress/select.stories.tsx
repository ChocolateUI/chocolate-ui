import React from 'react'
import { storiesOf } from '@storybook/react'
import Progress from './progress'

const defaultProgress = () => (
  <>
    <Progress percent={40} theme="warning" strokeHeight={10} />
    <Progress styles={{ marginTop: 20 }} percent={50} theme="success" strokeHeight={10} />
    <Progress styles={{ marginTop: 20 }} percent={60} theme="primary" strokeHeight={10} />
    <Progress styles={{ marginTop: 20 }} percent={70} theme="info" strokeHeight={10} />
    <Progress styles={{ marginTop: 20 }} percent={80} theme="secondary" strokeHeight={10} />
    <Progress styles={{ marginTop: 20 }} percent={90} theme="dark" strokeHeight={10} />
  </>
)

storiesOf('Progress 进度条', module)
  .add('默认样式', defaultProgress)