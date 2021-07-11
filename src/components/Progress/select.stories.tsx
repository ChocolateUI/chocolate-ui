import React from 'react'
import { Meta, Story } from '@storybook/react'
import Progress, { ProgressProps } from './progress'
import ProgressDoc from './progress-doc.mdx'

const BaseProgress = (props: ProgressProps) => {
  const { percent, theme, strokeHeight, showText } = props;
  return <Progress percent={percent} theme={theme} showText={showText} strokeHeight={strokeHeight} />
}

export default {
  component: Progress,
  title: 'Progress',
  parameters: {
    docs: {
      page: ProgressDoc,
      source: {
        type: 'code'
      }
    },
    controls: { 
      // include: ['percent', 'strokeHeight', 'showText', 'theme'],
      hideNoControlsWarning: true 
    }
  },
  argTypes: {
    percent: {
      control: { 
        type: 'range', min: 0, max: 100, step: 1,
      }
    },
    theme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
      }
    }
  }
} as Meta;

const _default: Story<ProgressProps> = (args) => <BaseProgress {...args} />;

// primary
export const Primary = _default.bind({});

Primary.args = {
  theme: 'primary',
  percent: 30,
  strokeHeight: 10,
  showText: true,
}