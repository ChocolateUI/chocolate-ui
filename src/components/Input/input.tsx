import React, { ReactElement, FC, ChangeEvent, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { scopedClass } from '../../utils/scopedClass'
import Icon from '../Icon/icon'

const sc = scopedClass('chocolate-input')

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean,
    size?: InputSize,
    icon?: IconProp,
    prepend?: string | ReactElement,
    append?: string | ReactElement,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        ...restProps
    } = props;
    const classnames = classNames(sc('wrapper'), {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend,
    })

    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }

    if ('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    return (
        <div
            className={classnames}
            style={style}
        >
            {prepend && <div className={sc('group-prepend')}>{prepend}</div>}
            {icon && <div className={sc('icon-wrapper')}><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input
                className={sc('inner')}
                disabled={disabled}
                {...restProps}
            />
            {append && <div className={sc('group-append')}>{append}</div>}
        </div>
    )
}

Input.defaultProps = {
    disabled: false,
}

export default Input;