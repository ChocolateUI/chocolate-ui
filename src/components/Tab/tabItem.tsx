import React, { FC } from 'react';

export interface TabItemProps {
  /** Tab选项上面的文字 */
  label: string | React.ReactElement;
  /** Tab选项是否被禁用 */
  disabled?: boolean;
}

const TabItem: FC<TabItemProps> = (props) => {
  const {
    children,
  } = props

  return (
    <>
       {children}
    </>
  )
};

TabItem.displayName = 'TabItem'

export default TabItem;
