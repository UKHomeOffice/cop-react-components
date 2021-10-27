import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder, toArray } from '../utils/Utils';
import './TextInput.scss';

export const DEFAULT_CLASS = 'govuk-input';
const TextInput = ({
  id,
  fieldId,
  disabled,
  error,
  classBlock,
  classModifiers: _classModifiers,
  className,
  ...attrs
}) => {
  const classModifiers = [...toArray(_classModifiers), error ? 'error' : undefined ];
  const classes = classBuilder(classBlock, classModifiers, className);
  return (
    <input
      {...attrs}
      disabled={disabled}
      id={id}
      name={fieldId}
      type="text"
      className={classes()}
    />
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

TextInput.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

TextInput.displayName = 'TextInput';

export default TextInput;
