// Global imports
import React from 'react';
import PropTypes from 'prop-types';

// Local imports
import Radio from './Radio';
import Readonly from '../Readonly';
import { classBuilder } from '../utils/Utils';
import './Radios.scss';

export const DEFAULT_CLASS = 'govuk-radios';
const Radios = ({
  id,
  fieldId,
  readonly,
  options,
  value,
  onChange,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  if (readonly) {
    const selectedValue = typeof(value) === 'object' ? value?.value : value;
    const selectedOption = options ? options.find(option => option.value === selectedValue) : undefined;
    return (
      <Readonly id={id} className={className} {...attrs}>
        <div>{selectedOption?.label}</div>
        <div>{selectedOption?.nestedJSX}</div>
      </Readonly>
    );
  }
  return (
    <div id={id} className={classes()} onChange={onChange} {...attrs}>
      {options && options.map((option, index) => {
        const optionId = `${fieldId}-${index}`;
        if (typeof option === 'string') {
          return <div className={classes('divider')} key={optionId}>{option}</div>
        } else {
          const name = fieldId;
          const selected = typeof(value) === 'object' ? (option.value === value?.value) : (option.value === value);
          return (
            <Radio
              key={optionId}
              id={optionId}
              name={name}
              option={option}
              selected={selected}
              classBlock={classBlock}
              classModifiers={classModifiers}
              className={className} />
          );
        }
      })}
    </div>
  );
};

Radios.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        hint: PropTypes.string,
        disabled: PropTypes.bool
      }),
      PropTypes.string
    ])
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Radios.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default Radios;