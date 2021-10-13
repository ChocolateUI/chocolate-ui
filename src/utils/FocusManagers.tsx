import React from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";

function FocusManager(props: {
  onBlur: (arg0: { persist: () => void }) => void;
  onFocus: (arg0: any) => void;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  tabIndex: number;
  // onKeyDown: (event: KeyboardEvent) => void;
}) {
  let timeoutId: NodeJS.Timeout;
  function onBlur(e: { persist: () => void }) {
    e.persist();
    timeoutId = setTimeout(() => {
      props.onBlur(e);
    });
  }
  function onFocus(e: any) {
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
  onBlur: PropTypes.func.isRequired,
};

export default FocusManager;
