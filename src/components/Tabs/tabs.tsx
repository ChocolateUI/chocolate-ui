import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { scopedClass } from '../../utils/scopedClass'
import { TabItemProps } from './tabItem'

const sc = scopedClass('chocolate-tabs')

export interface TabsProps {
  /**当前激活 tab 面板的 index，默认为0 */
  defaultIndex?: number;
  /**可以扩展的 className */
  className?: string;
  /**点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void;
  /**Tabs的样式，两种可选，默认为 line */
  type?: 'line' | 'card';
}


/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'chocolate-ui'
 * ~~~
 */
const Tabs: FC<TabsProps> = (props) => {
  const {
    defaultIndex,
    className,
    onSelect,
    type,
    children,
  } = props
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const classes = classNames('chocolate-tabs', className)

  const handleItemClick = (index: number, disabled: boolean) => {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  }
  const navClass = classNames(sc('nav'), {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  });

  const renderNavLinks = () => {
    return React.Children.map(children, function (child, index) {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const { label, disabled = false } = childElement.props
      const classes = classNames(sc('nav-item'), {
        'is-active': activeIndex === index,
        'disabled': disabled,
      });
      return (
        <li key={`nav-item-${index}`} className={classes} onClick={() => handleItemClick(index, disabled)}>
          {label}
        </li>
      )
    });
  }

  const renderContent = () => {
    return React.Children.map(children, function (child, index) {
      if (index === activeIndex) {
        return child;
      }
    });
  }

  return (
    <div className={classes}>
      <ul className={navClass}>
        {
          renderNavLinks()
        }
      </ul>
      <div className={sc('content')}>
        {
          renderContent()
        }
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line'
}

export default Tabs;