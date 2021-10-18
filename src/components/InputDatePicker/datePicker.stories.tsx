import React from "react";
import { Story, Meta } from "@storybook/react";
import InputDatePicker from "./inputDatePicker";
import { actions } from "@storybook/addon-actions";
import inputDatePickerDoc from "./inputDatePickerDoc.mdx";
import Card from "../Card/card";

const BaseInputDatePicker = () => {
  const cardCss = { margin: "20px 20px 0 0" };
  return (
    <div style={{ width: 300 }}>
      <Card title="基本使用" style={cardCss}>
        <InputDatePicker onChange={() => actions("onChange")} />
      </Card>
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
