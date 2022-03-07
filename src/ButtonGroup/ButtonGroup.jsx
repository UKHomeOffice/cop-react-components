import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './ButtonGroup.scss';

export const DEFAULT_CLASS = 'hods-button-group';
export const ButtonGroup = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);

  return <div {...attrs} className={classes()}>
    {children}
  </div>;
};

ButtonGroup.propTypes = {
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

ButtonGroup.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default ButtonGroup;
