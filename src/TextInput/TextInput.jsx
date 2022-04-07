// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import Readonly from '../Readonly';
import { classBuilder, toArray } from '../utils/Utils';
import './TextInput.scss';

export const DEFAULT_CLASS = 'govuk-input';
const TextInput = ({
  id,
  fieldId,
  disabled,
  error,
  readonly,
  prefix,
  suffix,
  classBlock,
  classModifiers: _classModifiers,
  className,
  ...attrs
}) => {
  const classModifiers = [...toArray(_classModifiers), error ? 'error' : undefined ];
  const classes = classBuilder(classBlock, classModifiers, className);
  if (readonly) {
    return (
      <Readonly id={id} classModifiers={classModifiers} className={className} {...attrs}>
        {attrs.value}
      </Readonly>
    );
  }

  const useWrapper = !!(prefix || suffix);
  const input = (
    <input
      {...attrs}
      disabled={disabled}
      id={id}
      name={fieldId}
      type="text"
      className={classes()}
    />
  );

  if (useWrapper) {
    return (
      <div className={classes('wrapper')}>
        {prefix && (
          <div className={classes('prefix')} aria-hidden='true'>
            {prefix}
          </div>
        )}
        {input}
        {suffix && (
          <div className={classes('suffix')} aria-hidden='true'>
            {suffix}
          </div>
        )}
      </div>
    );
  };
  return input;
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  readonly: PropTypes.bool,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
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
