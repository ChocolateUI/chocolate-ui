import React from 'react';
import { action } from '@storybook/addon-actions';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
import { Story, Meta } from '@storybook/react'
import MenuDoc from './menu-doc.mdx';

const BaseMenu = (props: MenuProps) =>{
  const { mode, defaultOpenSubMenus, defaultIndex } = props;
  return (
    <Menu mode={mode} 
        defaultOpenSubMenus={defaultOpenSubMenus} 
        defaultIndex={defaultIndex} 
        onSelect={(index) => { action(`clicked ${index} item`) }} 
    >
        <MenuItem>
            菜单 1
        </MenuItem>
        <MenuItem>
            菜单 2
        </MenuItem>
        <MenuItem>
            菜单 3
        </MenuItem>
        <SubMenu title='菜单 4'>
            <MenuItem>
                子菜单项 1
            </MenuItem>
            <MenuItem>
                子菜单项 2
            </MenuItem>
            <MenuItem>
                子菜单项 3
            </MenuItem>
        </SubMenu>
    </Menu>
  )
}

export default {
  component: Menu,
  title: 'Menu',
  parameters: {
    docs: {
      page: MenuDoc,
      source: {
        type: 'code'
      }
    },
    layout: 'centered',
    controls: { 
      include: [],
      hideNoControlsWarning: true 
    }
  },
} as Meta;

const _default: Story<MenuProps> = (args) => <BaseMenu {...args} />;

// 水平 Menu
export const Horizontal = _default.bind({});

Horizontal.args = {
  mode: 'horizontal',
  defaultIndex: '0',
  defaultOpenSubMenus: []
}

// 垂直 Menu
export const Vertical = _default.bind({});

Vertical.args = {
  ...Horizontal.args,
  mode: 'vertical',
  defaultOpenSubMenus: []
}

// 默认展开子 Menu
export const defaultOpened = _default.bind({});

defaultOpened.args = {
  ...Horizontal.args,
  defaultIndex: '2',
  mode: 'vertical',
  defaultOpenSubMenus: ['3']
}