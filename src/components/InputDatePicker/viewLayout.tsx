import React, { FC, ReactNode, useState } from "react";
import classNames from "classnames";
import { scopedClass } from "../../utils/scopedClass";

const sc = scopedClass("chocolate-picker-view-layout");

interface HeaderWrap {
  leftElement: ReactNode;
  middleElement: ReactNode;
  rightElement: ReactNode;
}
export interface ViewLayoutProps {
  bodyElement: ReactNode;
  header: HeaderWrap;
  footerElement: ReactNode;
}

export const ViewLayout: FC<ViewLayoutProps> = (props) => {
  const {
    header: { leftElement, middleElement, rightElement },
    bodyElement,
    footerElement,
  } = props;

  return (
    <div className={classNames(sc("container"))}>
      <div className={classNames(sc("header"))}>
        <div>{leftElement}</div>
        <div>{middleElement}</div>
        <div>{rightElement}</div>
      </div>
      <div className={classNames(sc("body"))}>{bodyElement}</div>
      <div className={classNames(sc("footer"))}>{footerElement}</div>
    </div>
  );
};

ViewLayout.defaultProps = {};

export default ViewLayout;
