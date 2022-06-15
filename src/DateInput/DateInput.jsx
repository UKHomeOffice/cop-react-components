// Global Imports
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Local imports
import FormGroup from '../FormGroup';
import Readonly from '../Readonly';
import TextInput from '../TextInput';
import { classBuilder, getMonthName } from '../utils/Utils';

// Styles
import './DateInput.scss';

const toDateFromString = (str) => {
  if (str) {
    const [ day, month, year ] = str.split('-');
    return { day, month, year };
  }
  return { day: '', month: '', year: '' };
};

const toStringFromDate = (date) => {
  if (date) {
    const str = `${date.day}-${date.month}-${date.year}`;
    return str === '--' ? '' : str;
  }
  return '';
};

export const DEFAULT_CLASS = 'govuk-date-input';
const DateInput = ({
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
  const [date, setDate] = useState(undefined);
  const [dateChanged, setDateChanged] = useState(false);

  useEffect(() => {
    setDate(prev => {
      const existingDate = toStringFromDate(prev);
      if (existingDate !== (value || '')) {
        setDateChanged(true);
        return toDateFromString(value);
      }
      return prev || toDateFromString('');
    });
  }, [value, setDate, setDateChanged]);

  const handleChange = (event) => {
    const name = event.target.name.replace(`${fieldId}-`, '');
    const value = event.target.value;
    if (date && date[name] !== value) {
      setDate((prev) => ({ ...prev, [name]: value }));
      setDateChanged(true);
    }
  };

  const DATE_PARTS = [
    { id: 'day', width: '2', label: 'Day' },
    { id: 'month', width: '2', label: 'Month' },
    { id: 'year', width: '4', label: 'Year' }
  ];

  useEffect(() => {
    if (typeof onChange === 'function' && dateChanged) {
      const newValue = toStringFromDate(date);
      setDateChanged(false);
      onChange({ target: { name: fieldId, value: newValue }});
    }
  }, [dateChanged, date, fieldId, onChange, setDateChanged]);

  if (!date) {
    return null;
  }

  if (readonly) {
    return (
      <Readonly id={id} classModifiers={classModifiers} className={className} {...attrs}>
        {date.day} {getMonthName(date.month)} {date.year}
      </Readonly>
    );
  }

  return (
    <div className={DEFAULT_CLASS} id={id} {...attrs}>
      {DATE_PARTS.map(part => (
        <FormGroup id={`${id}-${part.id}`} label={part.label} required classBlock={classes('item')} key={`${id}-${part.id}`}>
          <TextInput
            id={`${id}-${part.id}`}
            fieldId={`${fieldId}-${part.id}`}
            value={date[part.id]}
            onChange={handleChange}
            pattern='[0-9]*'
            inputMode='numeric'
            error={propsInError && propsInError[part.id] ? 'error' : ''}
            className={classes('input')}
            classModifiers={`width-${part.width}`}
          />
        </FormGroup>
      ))}
    </div>
  );
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
  error: PropTypes.any,
  propsInError: PropTypes.shape({
    year: PropTypes.bool,
    month: PropTypes.bool,
    day: PropTypes.bool
  }),
  value: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
};

DateInput.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default DateInput;