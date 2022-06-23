import React from "react";
import PropTypes from "prop-types";
import { classBuilder } from "../utils/Utils";
import "./WarningText.scss";

export const DEFAULT_CLASS = "govuk-warning-text";

const WarningText = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return (
    <div {...attrs} className={classes()}>
      <span className={classes("icon")}>!</span>
      <strong className={classes("text")}>
        <span className={classes("assistive")}>Warning</span>
        {children}
      </strong>
    </div>
  );
};

WarningText.propTypes = {
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  className: PropTypes.string,
};

WarningText.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default WarningText;
