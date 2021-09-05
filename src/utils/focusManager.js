import React from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";

function FocusManager(props) {
  let timeoutId;
  function onBlur(e) {
    e.persist();
    timeoutId = setTimeout(() => {
      props.onBlur(e);
    });
  }
  function onFocus(e) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    props.onFocus(e);
  }
  return (
    <div
      onFocus={onFocus}
      onBlur={onBlur}
      {...omit(props, ["onFocus", "onBlur"])}
    >
      {props.children}
    </div>
  );
}

FocusManager.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default FocusManager;
