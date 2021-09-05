import React from "react";
import { Story, Meta } from "@storybook/react";
import InputDatePicker, { InputDatePickerProps } from "./inputDatePicker";
import { actions } from "@storybook/addon-actions";

const BaseInputDatePicker = (props: InputDatePickerProps) => {
  return (
    <div style={{ width: 300 }}>
      <InputDatePicker onChange={()=>actions('onChange')} />
    </div>
  );
};

export default {
  component: InputDatePicker,
  title: "InputDatePicker",
  argTypes: {
    defaultValue: {
      // options: [],
      // control: { type: 'date' }
    },
  },
  parameters: {
    docs: {
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
