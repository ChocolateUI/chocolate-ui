import React from 'react'
import { storiesOf } from '@storybook/react'
import Select from './select'
import Option from './selectOption'

const defaultSelect = () => (
    <Select>
        <Option value='jack'> Jack </Option>
        <Option value='lucy'> Lucy </Option>
        <Option value='ming'> Ming </Option>
    </Select>
)
storiesOf('Select', module)
    .add('默认样式', defaultSelect)