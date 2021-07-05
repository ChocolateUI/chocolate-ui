import React from 'react';
export interface SelectOptionProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
}
declare const SelectOption: React.FC<SelectOptionProps>;
export default SelectOption;
