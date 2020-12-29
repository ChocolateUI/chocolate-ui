import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import DatePicker from './datePicker';


const wrapperStyle: React.CSSProperties = {
    width: '500px'
}

const defaultDatePicker = () => (
  <DatePicker />
)

const storyWrapper = (stroyFn: any) => (
    <div style={wrapperStyle}>
        {stroyFn()}
    </div>
)

storiesOf('DatePicker', module)
    .addDecorator(storyWrapper)
    .add('日历组件', defaultDatePicker)