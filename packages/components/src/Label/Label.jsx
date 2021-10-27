import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './Label.scss';

export const OPTIONAL_SUFFIX = ' (optional)';
export const DEFAULT_CLASS = 'govuk-label';
const Label = ({
  children,
  id,
  required,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return <label {...attrs} htmlFor={id} className={classes()}>
    {children}
    {!required && typeof(children) === 'string' && OPTIONAL_SUFFIX}
  </label>;
};

Label.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Label.defaultProps = {
  required: false,
  classBlock: DEFAULT_CLASS
};

export default Label;
