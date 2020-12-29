import React, { FC, useState, useRef, useEffect } from 'react'
import Header from './header'
import Body from './body'
import DayJs from 'dayjs';

interface DatePickerProps {
  defaultValue?: string;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const [date, setDate] = useState(DayJs)
  const [containerWidth, setContainerWidth] = useState(0)
  const componentRef = useRef(null)

  const onPrevClick = () => {
    const preMonth = date.subtract(1, 'month')
    setDate(preMonth)
  }
  const onNextClick = () => {
    const preMonth = date.add(1, 'month')
    setDate(preMonth)
  }
  useEffect(() => {
    const resizeHandle = () => {
      if (componentRef) {
        setContainerWidth(componentRef.current.offsetWidth)
      }
    };
    window.addEventListener('resize', resizeHandle);
    setContainerWidth(componentRef.current.offsetWidth)
  }, [])
  return (
    <div className="rdp__container" ref={componentRef}>
      <Header
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        date={date}
      />
      <Body
        defaultValue={date} 
        range={false}
        itemRender={false}
        isAnimating={false}
        bodyWidth={containerWidth}
        ranges={[[DayJs().add(8, 'day'), DayJs().add(12, 'day')], [DayJs(), DayJs().add(8, 'day')]]}
      />
    </div>
  )
}

export default DatePicker;