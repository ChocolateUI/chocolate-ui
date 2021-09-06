import React from "react";
import { Story, Meta } from "@storybook/react";
import Icon, { IconProps } from "./icon";
import iconsCache from "./shared/res";
import copy from "copy-to-clipboard";

const buildIcons = (props: IconProps, icons: any) => {
  const { theme } = props;

  return (
    <>
      <h6> 一共支持 {Object.keys(iconsCache).slice(0, 256).length} 种图标 </h6>
      <br />
      <ul
        style={{
          display: "flex",
          flexFlow: "row wrap",
          listStyle: "none",
        }}
      >
        {Object.keys(iconsCache)
          .splice(0, 256)
          .map((key, index) => {
            const iconName = icons[key].iconName;
            const _length = iconName.split("-").length;
            return (
              <li
                className="svgCls"
                style={{
                  display: "inline-flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flex: "0 1 20%",
                  minWidth: 120,
                  padding: "0px 7.5px 20px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  copy(iconName);
                  alert('复制成功')
                }}  
                key={index}
              >
                <Icon theme={theme} icon={iconName} />
                <div
                  style={{
                    color: "#666",
                    fontSize: 12,
                    width: 70,
                    overflow: "hidden",
                  }}
                >
                  <span>{iconName.split("-")[_length - 1]}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

const BaseIcon = (props: IconProps) => {
  return buildIcons(props, iconsCache);
};

export default {
  Component: Icon,
  title: "Icon",
  argTypes: {
    theme: {
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "light",
        "dark",
      ],
      control: { type: "select" },
    },
  },
  parameters: {
    docs: {
      //   page: IconDoc,
      source: {
        type: "code",
      },
    },
    controls: { include: ["theme"] },
  },
} as Meta;

const _default: Story<IconProps> = (args) => <BaseIcon {...args} />;

// default
export const ShowIcons = _default.bind({});

ShowIcons.args = {
  theme: "primary",
};
