import React from 'react';
import { Story, Meta } from '@storybook/react'
import Alert, { BaseAlertProps } from './alert';
import AlertDoc from './alert-doc.mdx';

const BaseAlert = (props: BaseAlertProps) => {
  const { message, description, closable, type } = props;
  return <Alert  message={message} description={description} closable={closable} type={type} />  
}

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

// storiesOf('Alert 警告提示', module)
//     .addDecorator(storyWrapper)
//     .add('默认样式', defaultAlert)
//     .add('四种样式', alertWithType)
//     .add('可关闭的警告提示', alertWithClosable)


export default {
  Component: Alert,
  title: 'Alert',
  argTypes: {
    type: {
      options: ['default', 'success', 'danger', 'warning'],
      control: { type: 'select' }
    },
  },
  parameters: {
    docs: {
      page: AlertDoc,
      source: {
        type: 'code'
      }
    },
    layout: 'centered',
    controls: { exclude: ['className'] }
  },
} as Meta;

const _default: Story<BaseAlertProps> = (args) => <BaseAlert {...args} />;

// default
export const Default = _default.bind({});

Default.args = {
  className: '',
  message: 'Tips',
  description: 'Detailed description and advice about default copywriting.',
  closable: false,
  type: 'default'
};

// success
export const Success = _default.bind({});

Success.args = {
  ...Default.args,
  type: 'success'
};

// danger
export const Danger = _default.bind({});

Danger.args = {
  ...Default.args,
  type: 'danger'
};


// warning
export const Warning = _default.bind({});

Warning.args = {
  ...Default.args,
  type: 'warning'
};