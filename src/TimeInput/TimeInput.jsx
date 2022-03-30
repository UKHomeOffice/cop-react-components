// Global Imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import { classBuilder } from '../utils/Utils';
import './TimeInput.scss';
import TextInput from '../TextInput';
import Label from '../Label';
import Readonly from '../Readonly';

export const DEFAULT_CLASS = 'govuk-date-input';
const TimeInput = ({
  id,
  fieldId,
  classBlock,
  classModifiers,
  className,
  error,
  value,
  onChange,
  readonly,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);

  if (readonly) {
    return (
      <Readonly id={id} classModifiers={classModifiers} className={className} {...attrs}>
        {value?.hour}:{value?.minute }
      </Readonly>
    );
  }

  return (
    <div className={DEFAULT_CLASS} id={id} {...attrs}>
      <div className={classes('item')}>
        <Label id={`${id}-hour-label`} className={`${classes('label')}`} htmlFor={`${id}-hour`} required>
          Hour
        </Label>
        <TextInput
          id={`${id}-hour`}
          fieldId={`${fieldId}-hour`}
          value={value?.hour}
          onChange={onChange}
          pattern='[0-9]*'
          inputMode='numeric'
          error={error?.hour ? 'error' : ''}
          className={classes('input')}
          classModifiers='width-2'
          max='2'
        />
      </div>
      <div className={classes('item')}>
        <Label id={`${id}-minute-label`} className={`${classes('label')}`} htmlFor={`${id}-minute`} required>
          Minute
        </Label>
        <TextInput
          id={`${id}-minute`}
          fieldId={`${fieldId}-minute`}
          value={value?.minute}
          onChange={onChange}
          pattern='[0-9]*'
          inputMode='numeric'
          error={error?.minute ? 'error' : ''}
          className={classes('input')}
          classModifiers='width-2'
          max='2'
        />
      </div>
    </div>
  );
};

TimeInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
  error: PropTypes.shape({
    hour: PropTypes.bool,
    minute: PropTypes.bool,
 
  }),
  value: PropTypes.shape({
    hour: PropTypes.number,
    minute: PropTypes.number,

  }),
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
};

TimeInput.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default TimeInput;
