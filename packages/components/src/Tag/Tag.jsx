import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './Tag.scss';

export const DEFAULT_CLASS = 'hods-tag';
const Tag = ({ children, text, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return <strong {...attrs} className={classes()}>
    {text || children}
  </strong>;
};

Tag.propTypes = {
  text: PropTypes.string,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Tag.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default Tag;
