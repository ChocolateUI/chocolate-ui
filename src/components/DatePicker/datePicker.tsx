import React, { FC, useState } from 'react'
import Header from './header'
import DayJs from 'dayjs';

interface DatePickerProps {
  defaultValue: string;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const [date, setDate] = useState(DayJs)
  const onPrevClick =() => {
    const preMonth = date.subtract(1, 'month')
    setDate(preMonth)
  }
  const onNextClick =()=>{
    const preMonth = date.add(1, 'month')
    setDate(preMonth)
  }
  return (
    <Header
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
      date={date}
    />
  )
}

export default DatePicker;