import { FC } from 'react'
import Select, { SelectProps } from './select'
import SelectOption, { SelectOptionProps } from './selectOption'

export type ISelectComponent = FC<SelectProps> & {
    Option: FC<SelectOptionProps>
}

const TransSelect = Select as ISelectComponent

TransSelect.Option = SelectOption

export default TransSelect
