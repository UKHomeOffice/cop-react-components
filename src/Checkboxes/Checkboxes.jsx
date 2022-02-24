// Global imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Local imports
import Checkbox from './Checkbox';
import Readonly from '../Readonly';
import { classBuilder } from '../utils/Utils';
import './Checkboxes.scss';

export const DEFAULT_CLASS = 'govuk-checkboxes';

const Checkboxes = ({
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

  const [selection, setSelection] = useState(value ? value : []);

  const updateSelection = ({ target }) => {
    if (target.checked) {
      setSelection((oldSelection) => [...oldSelection, target.value]);
    } else {
      setSelection(selection.filter((s) => s !== target.value));
    }
  };

  useEffect(() => {
    if(typeof onChange === 'function' && selection !== value){
      onChange({target: {name: fieldId, value: selection}});
    }
  }, [selection, onChange, fieldId, value]);

  if(readonly){
    return (
      <Readonly id={id} className={className} {...attrs}>
        {value.join(' ')}
      </Readonly>
    );
  }

  return (
    <div id={id} className={classes()} {...attrs}>
      {options &&
        options.map((option, index) => {
          const optionId = `${fieldId}-${index}`;
          const selected = typeof value === 'object' ? value.includes(option.value) : false;
          return (
            <Checkbox
              key={optionId}
              id={optionId}
              name={optionId}
              option={option}
              selected={selected}
              onChange={updateSelection}
              classBlock={classBlock}
              classModifiers={classModifiers}
              className={className}
            />
          );
        })}
    </div>
  );
};

Checkboxes.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        hint: PropTypes.string,
        disabled: PropTypes.bool,
      }),
      PropTypes.string,
    ])
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
};

Checkboxes.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default Checkboxes;
