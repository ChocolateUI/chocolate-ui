import React, { FC, useState, useRef, useEffect } from 'react'
import Header from './header'
import Body from './body'
import DayJs from 'dayjs';

export interface DatePickerProps {
  defaultValue?: string;
}

export const DatePicker: FC<DatePickerProps> = (props) => {
  const [date, setDate] = useState(DayJs)
  const [containerWidth, setContainerWidth] = useState(0)
  const [animating, setAnimating] = useState(false)
  const componentRef = useRef(null)

  const onPrevClick = () => {
    const preMonth = date.subtract(1, 'month')
    setDate(preMonth)
    setAnimating(true)
  }
  const onNextClick = () => {
    const nextMonth = date.add(1, 'month')
    setDate(nextMonth)
    setAnimating(true)
  }
  useEffect(() => {
    const resizeHandle = () => {
      if (componentRef) {
        setContainerWidth(componentRef.current!['offsetWidth'])
      }
    };
    window.addEventListener('resize', resizeHandle);
    setContainerWidth(componentRef.current!['offsetWidth'])
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
        selectable={true}
        range={false}
        itemRender={false}
        isAnimating={animating}
        animateEnd={() => setAnimating(false)}
        bodyWidth={containerWidth}
        date={date}
        ranges={[[DayJs().add(8, 'day'), DayJs().add(12, 'day')], [DayJs(), DayJs().add(8, 'day')]]}
      />
    </div>
  )
}

export default DatePicker;