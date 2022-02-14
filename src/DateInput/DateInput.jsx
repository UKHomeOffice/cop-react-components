// Global Imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Local imports
import { classBuilder } from '../utils/Utils';
import './DateInput.scss';
import TextInput from '../TextInput';
import Label from '../Label';
import Readonly from '../Readonly';

export const DEFAULT_CLASS = 'govuk-date-input';
const DateInput = ({
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

  const [date, setDate] = useState({
    [`${id}-day`]: value?.day ? value.day : '',
    [`${id}-month`]: value?.month ? value.month : '',
    [`${id}-year`]: value?.year ? value.year : '',
  });

  const handleChange = (event) => {
    setDate((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (typeof onChange === 'function') {
      let singleVal = '';
      if (date[`${id}-day`] && date[`${id}-month`] && date[`${id}-year`]) {
        singleVal = `${date[`${id}-day`]}-${date[`${id}-month`]}-${date[`${id}-year`]}`;
      }
      onChange({
        target: {
          name: id,
          value: singleVal,
        },
      });
    }
  }, [date]);

  const convertMonth = (monthNum) => {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][monthNum - 1];
  };

  if (readonly) {
    const dateParts = value.split('-');
    return (
      <Readonly id={id} classModifiers={classModifiers} className={className} {...attrs}>
        {dateParts[0]} {convertMonth(dateParts[1])} {dateParts[2]}
      </Readonly>
    );
  }

  return (
    <div className={DEFAULT_CLASS} id={id} {...attrs}>
      <div className={classes('item')}>
        <Label id={`${id}-day-label`} className={`${classes('label')}`} htmlFor={`${id}-day`} required>
          Day
        </Label>
        <TextInput
          id={`${id}-day`}
          fieldId={`${fieldId}-day`}
          value={`${date[`${id}-day`]}`}
          onChange={handleChange}
          pattern='[0-9]*'
          inputMode='numeric'
          error={error?.day ? 'error' : ''}
          className={classes('input')}
          classModifiers='width-2'
        />
      </div>
      <div className={classes('item')}>
        <Label id={`${id}-month-label`} className={`${classes('label')}`} htmlFor={`${id}-month`} required>
          Month
        </Label>
        <TextInput
          id={`${id}-month`}
          fieldId={`${fieldId}-month`}
          value={`${date[`${id}-month`]}`}
          onChange={handleChange}
          pattern='[0-9]*'
          inputMode='numeric'
          error={error?.month ? 'error' : ''}
          className={classes('input')}
          classModifiers='width-2'
        />
      </div>
      <div className={classes('item')}>
        <Label id={`${id}-year-label`} className={`${classes('label')}`} htmlFor={`${id}-year`} required>
          Year
        </Label>
        <TextInput
          id={`${id}-year`}
          fieldId={`${fieldId}-year`}
          value={`${date[`${id}-year`]}`}
          onChange={handleChange}
          pattern='[0-9]*'
          inputMode='numeric'
          error={error?.year ? 'error' : ''}
          className={classes('input')}
          classModifiers='width-4'
        />
      </div>
    </div>
  );
};

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
  error: PropTypes.shape({
    day: PropTypes.bool,
    month: PropTypes.bool,
    year: PropTypes.bool,
  }),
  value: PropTypes.any,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
};

DateInput.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default DateInput;
