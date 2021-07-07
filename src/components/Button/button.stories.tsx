import React from 'react'
import { Story, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button, { BaseButtonProps } from './button'
import CustomMDXDocumentation from './button-doc.mdx' 

const DefaultButton = (props: BaseButtonProps) => {
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

const ButtonWithSize = (props: BaseButtonProps) => (
  <>
    <Button size="lg"> large </Button>
  </>
)

export default {
  component: Button,
  // title: 'Library/Button',
  title: 'Components/Button',
  decorators: [
    (Story) => (
      <div>
        <Story/>
      </div>
    ),
  ],
  argTypes: {
    size: {
      options: ['sm', 'lg'],
      description: 'Available options available to the Badge',
      control: { type: 'select' }
    },
  },
  parameters: { 
    docs: { 
      page: CustomMDXDocumentation, 
      source: {
        type: 'code'
      }
    } 
  },
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<BaseButtonProps> = (args) => <DefaultButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  className: '',
  disabled: false,
  size: 'sm',
  btnType: 'default',
  href: 'http://www.baidu.com',
};



// const Template2: Story<BaseButtonProps> = (args) => <ButtonWithSize {...args} />;

// export const Primary = Template2.bind({});

// Primary.args = {
//   btnType: 'default',
// };