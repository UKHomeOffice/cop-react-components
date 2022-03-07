import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';
import { classBuilder, toArray } from '../utils/Utils';
import './Button.scss';

export const DEFAULT_CLASS = 'hods-button';
export const START_BUTTON_LABEL = 'Start now';

const isAnchor = (href) => {
  return !!href;
};
const getStartIcon = (classes) => (
  <svg
    className={classes('start-icon')}
    xmlns="http://www.w3.org/2000/svg"
    width="17.5"
    height="19"
    viewBox="0 0 33 40"
    aria-hidden="true"
    focusable="false"
  >
    <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
  </svg>
);

const getLinkButton = ({ children, ...attrs }) => (
  <Link {...attrs} role="button">{children}</Link>
);

const getButton = ({ children, disabled, className, ...attrs }) => (
  <button
    data-module={DEFAULT_CLASS}
    aria-disabled={disabled}
    disabled={disabled}
    {...attrs}
    className={className}
  >
    {children}
  </button>
);

export const Button = ({
  children: _children,
  disabled,
  start,
  href,
  classBlock,
  classModifiers: _classModifiers,
  className,
  ...attrs
}) => {
  const classModifiers = [ ...toArray(_classModifiers), disabled ? 'disabled' : undefined, start ? 'start' : undefined ];
  const classes = classBuilder(classBlock, classModifiers, className);
  const children = (
    <Fragment>
      {_children}
      {start && getStartIcon(classes)}
    </Fragment>
  );
  if (isAnchor(href)) {
    return getLinkButton({ children, href, classBlock, classModifiers, className, ...attrs });
  }
  return getButton({ children, disabled, className: classes(), ...attrs });
};

Button.propTypes = {
  disabled: PropTypes.bool,
  start: PropTypes.bool,
  href: PropTypes.string,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  start: false,
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};


export const StartButton = ({ children, ...attrs }) => (
  <Button {...attrs} start>{children}</Button>
);

StartButton.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

StartButton.defaultProps = {
  children: START_BUTTON_LABEL
};

export default Button;
