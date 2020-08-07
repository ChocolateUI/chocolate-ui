import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import Alert from './alert';

const wrapperStyle: React.CSSProperties = {
    width: '500px'
}
const defaultAlert = () => (
    <Alert message="It's your message" />
)

const alertWithType = () => (
    <>
        <Alert message="Tips" type="default" description="Detailed description and advice about default copywriting." />
        <Alert message="Tips" type="success" description="Detailed description and advice about successful copywriting." />
        <Alert message="Tips" type="danger" description="Detailed description and advice about danger copywriting." />
        <Alert message="Tips" type="warning" description="Detailed description and advice about warning copywriting." />
    </>
)

const alertWithClosable = () => (
    <>
        <Alert message="Tips" type="default" description="Detailed description and advice about default copywriting." closable />
        <Alert message="Tips" type="success" description="Detailed description and advice about successful copywriting." closable />
        <Alert message="Tips" type="danger" description="Detailed description and advice about danger copywriting." closable />
        <Alert message="Tips" type="warning" description="Detailed description and advice about warning copywriting." closable />
    </>
)

const storyWrapper = (stroyFn: any) => (
    <div style={wrapperStyle}>
        {stroyFn()}
    </div>
)

storiesOf('Alert 警告提示', module)
    .addDecorator(storyWrapper)
    .add('默认样式', defaultAlert)
    .add('四种样式', alertWithType)
    .add('可关闭的警告提示', alertWithClosable)
