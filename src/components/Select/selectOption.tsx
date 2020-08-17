import React, { useContext } from 'react'
import classNames from 'classnames'
import { scopedClass } from '../../utils/scopedClass'
import { SelectContext } from './select'

export interface SelectOptionProps {
    value: string,
    children: React.ReactNode,
    disabled?: boolean,
}

const sc = scopedClass('peanut-select')

const SelectOption: React.FC<SelectOptionProps> = (props) => {
    const {
        value,
        children,
        ...restProps
    } = props
    const { disabled = false } = restProps
    const context = useContext(SelectContext)

    const handleOptionItem = (item: string) => {
        context.onSelect && context.onSelect(item)
        context.onShowOption && context.onShowOption(false)
    }
    const classnames = classNames(sc('option-list-item'), {
        'disabled': !disabled,
        // 'is-active': context.index === index,
    })
    return (
        <li
            className={classnames}
            onClick={() => handleOptionItem(value)}
            {...restProps}
        >
            {children}
        </li>
    )
}
export default SelectOption