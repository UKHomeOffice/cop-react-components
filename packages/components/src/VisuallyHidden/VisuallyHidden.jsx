import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './VisuallyHidden.scss';

const VisuallyHidden = ({ children, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('govuk-visually-hidden', classBlock, classModifiers, className);
  return <span {...attrs} className={classes()}>
    {children}
  </span>;
};

VisuallyHidden.propTypes = {
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

export default VisuallyHidden;
