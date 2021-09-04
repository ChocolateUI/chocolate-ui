import React from "react";
import PropTypes from "prop-types";
import { ViewLayout } from "./viewLayout";
import DatePicker from "./datePicker";
import { Button } from "../Button/button";
import Icon from "../icons/icon";

function DateView(props) {
  return (
    <ViewLayout
      bodyElement={
        <DatePicker
          calendar={{ year: 2021, monthIndex: 8 }}
          selectedDate={new Date(2021, 8, 5)}
        />
      }
      header={{
        leftElement: <Icon icon="arrow-left" />,
        middleElement: <p>sss</p>,
        rightElement: <Icon icon="arrow-right" />,
      }}
      footerElement={<Button btnType="ghost"> today</Button>}
    ></ViewLayout>
  );
}

DateView.propTypes = {};

export default DateView;
