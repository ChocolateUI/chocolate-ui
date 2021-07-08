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
  title: 'Button',
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
export const Primary = _default.bind({});

Primary.args = {
 ...Default.args,
 btnType: 'primary'
};

// _danger
export const Danger = _default.bind({});

Danger.args = {
 ...Default.args,
 btnType: 'danger'
};

// _link
export const Link = _default.bind({});

Link.args = {
 ...Default.args,
 btnType: 'link'
};