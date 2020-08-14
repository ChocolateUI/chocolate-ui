import React, { ChangeEvent } from 'react'
// import classNames from 'classnames'
import { SelectOptionProps } from './selectOption'
import Input from '../Input/input'

interface SelectProps {
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = (props) => {
    const {
        children,
        onChange,
    } = props

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<SelectOptionProps>;
            return React.cloneElement(childElement)
        })
    }
    return (
        <div>
            <Input onChange={onChange} readOnly/>
            {renderChildren()}
        </div>
    )
}

Select.defaultProps = {
    disabled: false
}

export default Select