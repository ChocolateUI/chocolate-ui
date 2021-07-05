import React, { ChangeEvent } from 'react';
export interface SelectProps {
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    defaultValue?: string;
}
interface ISelectContext {
    index?: string;
    onSelect?: (selectItem: string) => void;
    onShowOption?: (value: boolean) => void;
}
export declare const SelectContext: React.Context<ISelectContext>;
declare const Select: React.FC<SelectProps>;
export default Select;
