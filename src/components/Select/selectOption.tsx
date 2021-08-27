import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { scopedClass } from '../../utils/scopedClass'
import { SelectContext } from './select'

export interface SelectOptionProps {
  value: string,
  children: React.ReactNode,
  disabled?: boolean,
  active?: boolean,
}

const sc = scopedClass('chocolate-select')

const SelectOption: React.FC<SelectOptionProps> = (props) => {
  const {
    value,
    children,
    ...restProps
  } = props
  const context = useContext(SelectContext)
  const [over, setOver] = useState(false)

  const handleOptionItem = (item: string) => {
    if (!props.disabled) {
      context.onSelect && context.onSelect(item)
      context.onShowOption && context.onShowOption(false)
    }
  }
  const classnames = classNames(sc('option-list-item'), {
    'is-disabled': props.disabled,
    'is-active': value === context.value,
    'is-hover': over,
  })
  return (
    <li
      className={classnames}
      onMouseOver={()=>{
        if(!props.disabled){
          setOver(true)
        }
      }}
      onMouseLeave={()=>setOver(false)}
      onClick={() => handleOptionItem(value)}
      {...restProps}
    >
      {children}
    </li>
  )
}
export default SelectOption