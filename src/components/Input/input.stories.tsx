import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './input'

const defaultInput = () => (
    <>
        <Input
            placeholder="placeholder"
            onChange={action('changed')}
            style={{ width: 300  }}
        />
        <Input
            disabled
            placeholder="disabled input"
            style={{ marginTop: 20, width: 300  }}
        />
        <Input
            icon="search"
            style={{ marginTop: 20, width: 300  }}
        />
    </>
)

const inputWithSize = () => (
    <>
        <Input
            size='lg'
            defaultValue="large size"
            style={{ width: 300 }}
        />
        <Input
            size='sm'
            placeholder="small size"
            style={{ marginTop: 20, width: 300  }}
        />
    </>
)

const inputWithFix = () => (
    <>
        <Input
            defaultValue="google"
            append='.com'
            style={{ width: 300 }}
        />
        <Input
            defaultValue="prepend text"
            prepend="https://"
            style={{ marginTop: 20, width: 300 }}
        />
    </>
)
storiesOf('Input Component', module)
    .add('默认样式', defaultInput)
    .add('不同尺寸的 Input', inputWithSize)
    .add('带有前后缀的 Input', inputWithFix)