// Global imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Local imports
import Readonly from '../Readonly';
import { classBuilder, toArray } from '../utils/Utils';
import './Select.scss';

export const DEFAULT_CLASS = 'govuk-select';
export const DEFAULT_PLACEHOLDER = "Select an option...";

const Select = ({
  id,
  fieldId,
  disabled,
  error,
  readonly,
  options,
  onChange,
  classBlock,
  classModifiers: _classModifiers,
  className,
  value,
  defaultValue,
  placeholder,
  ...attrs
}) => {
  const classModifiers = [...toArray(_classModifiers), error ? 'error' : undefined ];
  const classes = classBuilder(classBlock, classModifiers, className);
  const [selected, setSelected ] = useState(value || defaultValue || "");
  const onSelectChanged = ({ target }) => {
    setSelected(target.value);
    if (typeof onChange === "function") {
      onChange({
        target: {
          name: fieldId, 
          value: target.value
        }
      })
    }
  };
  if (readonly) {
    const selectedValue = typeof(value) === 'object' ? value?.value : value;
    const selectedOption = options ? options.find(option => option.value === selectedValue) : undefined;
    return (
      <Readonly id={id} classModifiers={classModifiers} className={className} {...attrs}>
        {selectedOption?.label}
      </Readonly>
    );
  }
  return (
      <select id={id} name={fieldId} value={selected} disabled={disabled} className={classes()} onChange={onSelectChanged} {...attrs}>
        {options && options.map((option, index) => {
          const optionId = `${id}-${index}`;
          return <option key={optionId} id={optionId} className={className} value={option.value}>{option.label}</option>;
        })}
        <option value="" disabled hidden>{placeholder || DEFAULT_PLACEHOLDER}</option>
      </select>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  readonly: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        hint: PropTypes.string,
        disabled: PropTypes.bool,
        children: PropTypes.element
      }),
      PropTypes.string
    ])
  ),
  onChange: PropTypes.func,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string
};

Select.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

Select.displayName = 'Select';

export default Select;
