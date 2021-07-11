import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input, { InputProps } from './input'
import InputDoc from './input-doc.mdx'

const BaseInput = (props: InputProps) => {
  const { placeholder, size, disabled, prepend, append, defaultValue } = props;
  return (
    <Input
        size={size}
        placeholder={placeholder}
        disabled = {disabled}
        prepend={prepend}
        append={append}
        defaultValue={defaultValue}
        onChange={action('changed')}
        style={{ width: 300  }}
    />
  )
}

export default {
  component: Input,
  title: 'Input',
  parameters: {
    docs: {
      page: InputDoc,
      source: {
        type: 'code'
      }
    },
    controls: {
      include: ['disabled', 'size']
    }
  }
} as Meta;


const _default: Story<InputProps> = (args) => <BaseInput {...args} />;

// 默认
export const Default = _default.bind({});

Default.args = {
  disabled: false,
  size: 'sm',
  icon: undefined,
  placeholder: 'placeholder',
  prepend: '',
  append: '',
  onChange: () => {}
}

export const WithPrepend = _default.bind({});

WithPrepend.args = {
  ...Default.args,
  prepend: 'https://'
}

export const WidthAppend = _default.bind({});

WidthAppend.args = {
  ...Default.args,
  append: '.com'
}

export const DefaultValue = _default.bind({});

DefaultValue.args = {
  ...Default.args,
  defaultValue: 'you are so clever'
}