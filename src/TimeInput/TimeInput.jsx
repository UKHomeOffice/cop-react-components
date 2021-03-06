// Global Imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import FormGroup from '../FormGroup';
import Readonly from '../Readonly';
import TextInput from '../TextInput';
import { classBuilder } from '../utils/Utils';

// Styles
import './TimeInput.scss';

const toTimeFromString = (str) => {
  if (str) {
    const [ hour, minute ] = str.split(':');
    return { hour, minute };
  }
  return { hour: '', minute: '' };
};

const toStringFromTime = (time) => {
  if (time) {
    const str = `${time.hour}:${time.minute}`;
    return str === ':' ? '' : str;
  }
  return '';
};

export const DEFAULT_CLASS = 'govuk-date-input';
const TimeInput = ({
  id,
  fieldId,
  error,
  propsInError,
  value,
  onChange,
  readonly,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  const [time, setTime] = useState(undefined);
  const [timeChanged, setTimeChanged] = useState(false);

  useEffect(() => {
    setTime(prev => {
      const existingTime = toStringFromTime(prev);
      if (existingTime !== (value || '')) {
        setTimeChanged(true);
        return toTimeFromString(value);
      }
      return prev || toTimeFromString('');
    });
  }, [value, setTime, setTimeChanged]);

  const handleChange = (event) => {
    const name = event.target.name.replace(`${fieldId}-`, '');
    const value = event.target.value;
    if (time && time[name] !== value) {
      setTime((prev) => ({ ...prev, [name]: value }));
      setTimeChanged(true);
    }
  };

  const TIME_PARTS = [
    { id: 'hour', width: '2', label: 'Hour' },
    { id: 'minute', width: '2', label: 'Minute' },
  ];

  useEffect(() => {
    if (typeof onChange === 'function' && timeChanged) {
      const newValue = toStringFromTime(time);
      setTimeChanged(false);
      onChange({ target: { name: fieldId, value: newValue }});
    }
  }, [timeChanged, time, fieldId, onChange, setTimeChanged]);

  if (!time) {
    return null;
  }

  if (readonly) {
    return (
      <Readonly
        id={id}
        classModifiers={classModifiers}
        className={className}
        {...attrs}
      >
        {time.hour}:{time.minute}
      </Readonly>
    );
  }

  return (
    <div className={DEFAULT_CLASS} id={id} {...attrs}>
      {TIME_PARTS.map((part) => (
        <FormGroup
          id={`${id}-${part.id}`}
          label={part.label}
          required
          classBlock={classes('item')}
          key={`${id}-${part.id}`}
        >
          <TextInput
            id={`${id}-${part.id}`}
            fieldId={`${fieldId}-${part.id}`}
            value={time[part.id]}
            onChange={handleChange}
            pattern='[0-9]*'
            inputMode='numeric'
            error={propsInError && propsInError[part.id] ? 'error' : ''}
            className={classes('input')}
            classModifiers={`width-2`}
          />
        </FormGroup>
      ))}
    </div>
  );
};

TimeInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  className: PropTypes.string,
  error: PropTypes.string,
  propsInError: PropTypes.shape({
    minute: PropTypes.bool,
    hour: PropTypes.bool,
  }),
  value: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
};

TimeInput.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default TimeInput;