import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const wrapperStyle: React.CSSProperties = {
    width: '500px'
}

export const defaultMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => { action(`clicked ${index} item`) }} >
        <MenuItem>
            菜单 1
        </MenuItem>
        <MenuItem disabled>
            菜单 2
        </MenuItem>
        <MenuItem>
            菜单 3
        </MenuItem>
        <SubMenu title='子菜单'>
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

const verticalMenu = () => (
    <Menu defaultIndex='0' mode='vertical'>
        <MenuItem>
            菜单 1
        </MenuItem>
        <MenuItem disabled>
            菜单 2
        </MenuItem>
        <MenuItem>
            菜单 3
        </MenuItem>
        <SubMenu title='子菜单'>
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

const defaultOpenSubMenus = () => (
    <Menu defaultIndex='0' mode='vertical' defaultOpenSubMenus={['3']}>
        <MenuItem>
            菜单 1
        </MenuItem>
        <MenuItem disabled>
            菜单 2
        </MenuItem>
        <MenuItem>
            菜单 3
        </MenuItem>
        <SubMenu title='子菜单'>
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

const storyWrapper = (stroyFn: any) => (
    <div style={wrapperStyle}>
        {stroyFn()}
    </div>
)

storiesOf('Menu 菜单', module)
    .addDecorator(storyWrapper)
    .add('默认样式', defaultMenu)
    .add('纵向菜单', verticalMenu)
    .add('默认展开', defaultOpenSubMenus)