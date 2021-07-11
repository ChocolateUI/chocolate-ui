import React from 'react'
import { Story, Meta } from '@storybook/react'
import DatePicker from './datePicker'
import DatePickerDoc from './date-picker-doc.mdx'
const BaseDatePicker = () => <div style={{ width: 300 }}> <DatePicker /> </div>

export default {
  component: DatePicker,
  title: 'DatePicker',
  argTypes: {
    defaultValue: {
      // options: [],
      // control: { type: 'date' }
    }
  },
  parameters: {
    docs: {
      page: DatePickerDoc,
      source: {
        type: 'code'
      }
    },
    controls: { 
      include: [],
      hideNoControlsWarning: true 
    }
  },
} as Meta;

const _default: Story = () => <BaseDatePicker />;

// 默认
export const Default = _default.bind({});
