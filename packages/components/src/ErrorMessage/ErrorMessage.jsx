import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import VisuallyHidden from '../VisuallyHidden';
import './ErrorMessage.scss';

export const DEFAULT_CLASS = 'govuk-error-message';
const ErrorMessage = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return <span {...attrs} className={classes()}>
    <VisuallyHidden>Error:</VisuallyHidden>
    {children}
  </span>;
};

ErrorMessage.propTypes = {
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

ErrorMessage.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default ErrorMessage;
