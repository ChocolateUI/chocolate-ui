import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button, { BaseButtonProps } from './button'
import ButtonDoc from './button-doc.mdx'

const BaseButton = (props: BaseButtonProps) => {
  const { disabled, size, className, btnType, href } = props;
  return (
    <Button
      size={size}
      href={href}
      disabled={disabled}
      className={className}
      btnType={btnType}
      onClick={action('clicked')}
    > button </Button>
  )
}

export default {
  component: Button,
  title: 'Components/Button',
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      options: ['sm', 'lg'],
      control: { type: 'select' }
    },
  },
  parameters: {
    docs: {
      page: ButtonDoc,
      source: {
        type: 'code'
      }
    },
    layout: 'centered',
    controls: { exclude: ['className'] }
  },
} as Meta;

// _default
const _default: Story<BaseButtonProps> = (args) => <BaseButton {...args} />;

export const Default = _default.bind({});

Default.args = {
  className: '',
  disabled: false,
  size: 'sm',
  btnType: 'default',
  href: 'http://www.baidu.com',
};

// _primary
const _primary: Story<BaseButtonProps> = (args) => <BaseButton {...args} />;

export const Primary = _primary.bind({});

Primary.args = {
 ...Default.args,
 btnType: 'primary'
};

// _danger
const _danger: Story<BaseButtonProps> = (args) => <BaseButton {...args} />;

export const Danger = _danger.bind({});

Danger.args = {
 ...Default.args,
 btnType: 'danger'
};

// _link
const _link: Story<BaseButtonProps> = (args) => <BaseButton {...args} />;

export const Link = _link.bind({});

Link.args = {
 ...Default.args,
 btnType: 'link'
};