import React from 'react'
import { Story, Meta } from '@storybook/react'
import Select, { SelectProps } from './select'
import Option from './selectOption'
import SelectDoc from './select-doc.mdx'

const BaseSelect = (props: SelectProps) => {
  const { defaultValue, disabled } = props;
  return (
    <Select
      style={{ width: 300 }}
      defaultValue={defaultValue}
      onChange={(value) => console.log(value)}
    >
      <Option value='one'> one </Option>
      <Option value='two' disabled={disabled}> two </Option>
      <Option value='tree'> tree </Option>
      <Option value='four'> four </Option>
    </Select>
  )
}

export default {
  component: Select,
  title: 'Select',
  parameters: {
    docs: {
      page: SelectDoc,
      source: {
        type: 'code'
      }
    },
    controls: { 
      include: ['disabled'],
      hideNoControlsWarning: true 
    }
  }
} as Meta;

const _default: Story<SelectProps> = (args) => <BaseSelect {...args} />;

export const Default = _default.bind({});

Default.args = {
  defaultValue: 'four',
  disabled: false,
}