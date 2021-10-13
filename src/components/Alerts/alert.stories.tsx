import React from 'react';
import { Story, Meta } from '@storybook/react'
import Alert, { BaseAlertProps } from './alert';
import AlertDoc from './alert-doc.mdx';

const BaseAlert = (props: BaseAlertProps) => {
  const { message, description, closable, type } = props;
  return <Alert  message={message} description={description} closable={closable} type={type} />  
}

export default {
  Component: Alert,
  title: 'Alert',
  parameters: {
    docs: {
      page: AlertDoc,
      source: {
        type: 'code'
      }
    },
    layout: 'centered',
    controls: { exclude: ['className', 'type'] }
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