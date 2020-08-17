import React from 'react'
import { storiesOf } from '@storybook/react'
import Select from './select'
import Option from './selectOption'

const defaultSelect = () => (
    <Select
        style={{ width: 300 }}
        defaultValue="ming"
        onChange={(value) => console.log(value)}
    >
        <Option value='jack'> Jack </Option>
        <Option value='lucy' disabled> Lucy </Option>
        <Option value='ming'> Ming </Option>
        <Option value='nice'> Nice </Option>
    </Select>
)

storiesOf('Select 选择器', module)
    .add('默认样式', defaultSelect)