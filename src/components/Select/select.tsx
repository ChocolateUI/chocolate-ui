import React, { ChangeEvent, useState, createContext, useRef } from 'react'
import classNames from 'classnames'
import { SelectOptionProps } from './selectOption'
import Input from '../Input/input'
import { scopedClass } from '../../utils/scopedClass'
import Transition from '../Transition/transition'
import useClickOutside from '../../hooks/useClickOutside'

const sc = scopedClass('chocolate-select')

export interface SelectProps {
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    defaultValue?: string;
}

interface ISelectContext {
    index?: string,
    onSelect?: (selectItem: string) => void;
    onShowOption?: (value: boolean) => void;
}

export const SelectContext = createContext<ISelectContext>({ index: '0' });

const Select: React.FC<SelectProps> = (props) => {
    const {
        disabled,
        children,
        onChange,
        style,
        defaultValue,
    } = props
    const [showOption, setShowOption] = useState(false)
    const [inputValue, setInputValue] = useState(defaultValue)

    const handleClick = (value: string | ChangeEvent<HTMLInputElement>) => {
        setInputValue(value as string)
        onChange && onChange(value as ChangeEvent<HTMLInputElement>)
    }
    const handleShowOption = (value: boolean) => {
        setShowOption(value)
    }
    const passedContext: ISelectContext = {
        onSelect: handleClick,
        onShowOption: handleShowOption,
    }
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutside(componentRef, () => setShowOption(false))
    const renderChildren = () => {
        const classnames = classNames(sc('option-list'))
        return (
            <Transition
                in={showOption}
                animation="zoom-in-top"
                timeout={300}
            >
                <ul className={classnames}>
                    {
                        React.Children.map(children, (child, index) => {
                            const childElement = child as React.FunctionComponentElement<SelectOptionProps>
                            return React.cloneElement(childElement)
                        })
                    }
                </ul>
            </Transition>
        )
    }

    return (
        <div style={style} className='chocolate-select' ref={componentRef}>
            <SelectContext.Provider value={passedContext}>
                <Input
                    onChange={onChange}
                    icon='angle-down'
                    disabled={disabled}
                    readOnly={disabled ? false : true}
                    onClick={() => setShowOption(true)}
                    value={inputValue}
                />
                {renderChildren()}
            </SelectContext.Provider>
        </div>
    )
}

Select.defaultProps = {
    disabled: false
}

export default Select