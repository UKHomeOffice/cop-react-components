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

  // Selection is an array of the options which have been selected
  // Exclusive Flag is true when an option with the exclusive behaviour is checked
  const [selection, setSelection] = useState(value ? value : []);
  const [exclusiveFlag, setExclusiveFlag] = useState(false);

  const updateSelection = (event, option) => {

    // Destructs the event target (checkbox) to its value and checked boolean
    // Passing option here allows us to expose the 'behaviour' field
    const { value: targetValue, checked: isTargetChecked } = event.target;

    // Update the selection array to reflect what has been clicked
    if (isTargetChecked) {

      // This block is entered when either:
      // An exclusive checkbox has been newly checked
      // A non-exclusive checkbox has been newly checked while an exclusive checkbox is already checked
      if (
        (option.behaviour === 'exclusive' && !exclusiveFlag) || 
        (option.behaviour !== 'exclusive' && exclusiveFlag)
        ) {

        // Flip the exclusive flag and set the selection to only this checkbox
        setExclusiveFlag(!exclusiveFlag);
        setSelection([targetValue]);
      } else if (option.behaviour === 'exclusive' && exclusiveFlag) {

        // Flag is already on but a new exclusive option was selected so leave the flag on
        setSelection([targetValue]);
      } else {

        // Normal conditions apply, add selection to selection array
        setSelection((prev) => [...prev, targetValue]);
      }
    } else {

      // Checkbox was checked to begin with so uncheck it and remove from selections
      setSelection((prev) => prev.filter((s) => s !== targetValue));
    }
  };

  useEffect(() => {
    if (typeof onChange === 'function' && selection !== value) {
      onChange({ target: { name: fieldId, value: selection } });
    }
    
    // Loop through checkbox elements for page and check it if it's in the selection array
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
      checkbox.checked = selection.includes(checkbox.value);
    }

  }, [selection, onChange, fieldId, value]);

  if (readonly) {
    return (
      <Readonly id={id} className={className} {...attrs}>
        {options && options.filter(opt => selection.includes(opt.value)).map(opt => {
          return <div key={opt.value}>{opt.label}</div>;
        })}
      </Readonly>
    );
  }

  const idParts = id.split('.');
  idParts.pop();
  idParts.push(fieldId);
  const name = idParts.join('.');
  return (
    <div id={id} className={classes()} {...attrs}>
      {options &&
        options.map((option, index) => {
          const optionId = `${id}-${index}`;

          // Checks if this option is in the selection array
          const selected = Array.isArray(value) ? value.includes(option.value) : false;

          // Adds a divider between options
          if (typeof option === 'string') {
            return <div className={classes('divider')} key={optionId}>{option}</div>;
          } else {
            return (
              <Checkbox
                key={optionId}
                id={optionId}
                name={`${name}-${index}`}
                option={option}
                selected={selected}
                onChange={event => updateSelection(event, option)}
                classBlock={classBlock}
                classModifiers={classModifiers}
                className={className}
              />
            );
          }
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
        behaviour: PropTypes.string,
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
