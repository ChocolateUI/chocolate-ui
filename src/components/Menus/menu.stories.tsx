import React from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import { Story, Meta } from "@storybook/react";
import MenuDoc from "./menu-doc.mdx";
import Card from "../Card/card";
import "../../styles/common.stories";

const BaseMenu = () => {
  const cardCss = { margin: "20px 20px 0 0" };
  return (
    <div className="container">
      <div className="item">
        <Card title="水平导航" style={cardCss} shadow>
          <Menu>
            <MenuItem>菜单 1</MenuItem>
            <MenuItem>菜单 2</MenuItem>
            <MenuItem>菜单 3</MenuItem>
          </Menu>
        </Card>
      </div>

      <div className="item">
        <Card title="垂直导航" style={cardCss} shadow>
          <Menu mode="vertical">
            <MenuItem>菜单 1</MenuItem>
            <MenuItem>菜单 2</MenuItem>
            <MenuItem>菜单 3</MenuItem>
          </Menu>
        </Card>
      </div>
      <div className="item">
        <Card title="内嵌水平导航" style={cardCss} shadow>
          <Menu mode="horizontal">
            <MenuItem>菜单 1</MenuItem>
            <MenuItem>菜单 2</MenuItem>
            <MenuItem>菜单 3</MenuItem>
            <SubMenu title="菜单 4">
              <MenuItem>子菜单项 1</MenuItem>
              <MenuItem>子菜单项 2</MenuItem>
              <MenuItem>子菜单项 3</MenuItem>
            </SubMenu>
          </Menu>
        </Card>
      </div>
      <div className="item">
        <Card title="内嵌垂直导航" style={cardCss} shadow>
          <Menu mode="vertical">
            <MenuItem>菜单 1</MenuItem>
            <MenuItem>菜单 2</MenuItem>
            <MenuItem>菜单 3</MenuItem>
            <SubMenu title="菜单 4">
              <MenuItem>子菜单项 1</MenuItem>
              <MenuItem>子菜单项 2</MenuItem>
              <MenuItem>子菜单项 3</MenuItem>
            </SubMenu>
          </Menu>
        </Card>
      </div>

      <div className="item">
        <Card title="默认选中" style={cardCss} shadow>
          <Menu mode="horizontal" defaultIndex={"2"}>
            <MenuItem>菜单 1</MenuItem>
            <MenuItem>菜单 2</MenuItem>
            <MenuItem>菜单 3</MenuItem>
            <SubMenu title="菜单 4">
              <MenuItem>子菜单项 1</MenuItem>
              <MenuItem>子菜单项 2</MenuItem>
              <MenuItem>子菜单项 3</MenuItem>
            </SubMenu>
          </Menu>
        </Card>
      </div>
      <div className="item">
        <Card title="Icon导航" style={cardCss} shadow>
          <Menu>
            <MenuItem icon="address-book">菜单 1</MenuItem>
            <MenuItem icon="calculator">菜单 2</MenuItem>
            <MenuItem icon="chalkboard">菜单 3</MenuItem>
            <SubMenu icon="chart-pie" title="菜单 4">
              <MenuItem>子菜单项 1</MenuItem>
              <MenuItem>子菜单项 2</MenuItem>
              <MenuItem>子菜单项 3</MenuItem>
            </SubMenu>
          </Menu>
        </Card>
      </div>
      <div className="item">
        <Card title="默认展开内嵌导航" style={cardCss} shadow>
          <Menu mode="vertical" defaultOpenSubMenus={["3"]}>
            <MenuItem>菜单 1</MenuItem>
            <MenuItem>菜单 2</MenuItem>
            <MenuItem>菜单 3</MenuItem>
            <SubMenu title="菜单 4">
              <MenuItem>子菜单项 1</MenuItem>
              <MenuItem>子菜单项 2</MenuItem>
              <MenuItem>子菜单项 3</MenuItem>
            </SubMenu>
          </Menu>
        </Card>
      </div>
    </div>
  );
};

export default {
  component: Menu,
  title: "Menu 导航菜单",
  parameters: {
    docs: {
      page: MenuDoc,
      source: {
        type: "code",
      },
    },
    layout: "centered",
    controls: {
      include: [],
      hideNoControlsWarning: true,
    },
  },
} as Meta;

const _default: Story<MenuProps> = () => <BaseMenu />;

// Primary Menu
export const Primary = _default.bind({});

Primary.args = {
  mode: "horizontal",
  defaultIndex: "0",
  defaultOpenSubMenus: [],
};
