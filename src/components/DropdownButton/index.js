import React from "react";
import { Dropdown, useDropdownToggle, useDropdownMenu } from "react-overlays";
import scopedClass from "../../utils/scopedClass";
import classNames from "classnames";
import { Button } from "../Buttons/button";

const sc = scopedClass("chocolate-dropdown");

function Menu({ children }) {
  const { show, close, props } = useDropdownMenu();
  return (
    <div
      className={classNames(sc("menu"), {
        open: show,
      })}
      {...props}
      open={show}
      onClick={close}
    >
      {children}
    </div>
  );
}
function Toggle({ children }) {
  const [props, { toggle }] = useDropdownToggle();
  return (
    <Button btnType="ghost" size="small" {...props} onClick={toggle}>
      {children}
    </Button>
  );
}

function DropdownButton({ title, children }) {
  return (
    <Dropdown>
      {({ props }) => (
        <div {...props} className={sc("container")}>
          <Toggle>{title}</Toggle>
          <Menu>{children}</Menu>
        </div>
      )}
    </Dropdown>
  );
}

export default DropdownButton;
