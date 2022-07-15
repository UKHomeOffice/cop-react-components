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
  // Exclusive Option is the value of the checked exclusive option
  const [selection, setSelection] = useState(value ? value : []);
  const [exclusiveFlag, setExclusiveFlag] = useState(false);
  const [exclusiveOption, setExclusiveOption] = useState('');
  const [nonExclusiveOption, setNonExclusiveOption] = useState('');

  const updateSelection = (event, option) => {
    // Destructs the event target (checkbox) to its value and checked boolean
    // Passing option here allows us to expose the 'behaviour' field
    const { value: targetValue, checked: isTargetChecked } = event.target;

    // console.log(`targetValue = ${targetValue}, isTargetChecked = ${isTargetChecked}, option = ${JSON.stringify(option, null, 2)}`)

    // If this checkbox is checked then update the selection array with its value
    if (isTargetChecked) {
      setSelection((prev) => [...prev, targetValue]);
    } else {
      setSelection((prev) => prev.filter((s) => s !== targetValue));
    }

    // If this option's behaviour is set to 'exclusive' and is checked then set the
    // exclusiveFlag to true, update the exclusive option to its value and reset the
    // selection array to only its value
    if (option.behaviour === 'exclusive') {
      setExclusiveFlag(isTargetChecked);
      if (isTargetChecked) {
        setExclusiveOption(option.value);
        setSelection([option.value]);
      }
    } else if (exclusiveFlag && isTargetChecked) {
      setExclusiveFlag(false);
      setNonExclusiveOption([option.value]);
      setSelection([option.value]);
    }
  };

  useEffect(() => {
    if (typeof onChange === 'function' && selection !== value) {
      onChange({ target: { name: fieldId, value: selection } });
    }

    // Get a list of the checkbox components
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // If the checkbox isn't the exclusive option and the flag is on then uncheck it
    for (let checkbox of checkboxes) {
      // console.log(`checkbox = ${checkbox.value}, exclusive option = ${exclusiveOption}`)
      if (
        (checkbox.value !== exclusiveOption && exclusiveFlag) ||
        (checkbox.value === exclusiveOption && !exclusiveFlag)
      ) {
        // Either: this isn't the exclusive checkbox and the flag is on so uncheck it
        // or: this is the exclusive checkbox but the flag is not on so uncheck it
        checkbox.checked = false;
      } else if (
        checkbox.value === nonExclusiveOption &&
        exclusiveOption !== '' &&
        !exclusiveFlag) {
        // This isn't the non-exclusive option and the flag is not on so check it
        checkbox.checked = true;
      }
    }

  }, [selection, onChange, fieldId, value, exclusiveFlag, exclusiveOption, nonExclusiveOption]);

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
