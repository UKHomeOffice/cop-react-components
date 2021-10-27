import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './Hint.scss';

export const DEFAULT_CLASS = 'govuk-hint';
const Hint = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return <span {...attrs} className={classes()}>
    {children}
  </span>;
};

Hint.propTypes = {
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Hint.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default Hint;
