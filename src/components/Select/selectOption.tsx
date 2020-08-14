import React from 'react'
// import classNames from 'classnames'

export interface SelectOptionProps {
    value: string
}

const SelectOption: React.FC<SelectOptionProps> = (props) => {
    const {
        value,
    } = props
    return (
        <div>
            {value}
        </div>
    )
}
export default SelectOption