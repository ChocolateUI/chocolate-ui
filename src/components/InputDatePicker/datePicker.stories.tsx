import React from "react";
import { Story, Meta } from "@storybook/react";
import InputDatePicker, { InputDatePickerProps } from "./inputDatePicker";
import { actions } from "@storybook/addon-actions";
import inputDatePickerDoc from './inputDatePickerDoc.mdx';

const BaseInputDatePicker = (props: InputDatePickerProps) => {
  return (
    <div style={{ width: 300 }}>
      <InputDatePicker onChange={()=>actions('onChange')} />
    </div>
  );
};

export default {
  component: InputDatePicker,
  title: "DatePicker",
  argTypes: {
    defaultValue: {
      // options: [],
      // control: { type: 'date' }
    },
  },
  parameters: {
    docs: {
      page: inputDatePickerDoc,
      source: {
        type: "code",
      },
    },
    controls: {
      include: [],
      hideNoControlsWarning: true,
    },
  },
} as Meta;

const _default: Story = () => <BaseInputDatePicker />;

// 默认
export const Default = _default.bind({});
