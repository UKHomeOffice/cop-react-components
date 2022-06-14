// Global imports
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Local imports
import Hint, { DEFAULT_CLASS as DEFAULT_HINT_CLASS } from '../Hint/Hint';
import { DEFAULT_CLASS as DEFAULT_LABEL_CLASS } from '../Label/Label';
import { classBuilder } from '../utils/Utils';
import './Radios.scss';

export const DEFAULT_CLASS = 'govuk-radios';
const Radio = ({
  id,
  name,
  option,
  selected,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  const inputRef = useRef(null);
  /**
   * This is needed for externally setting the selected state.
   * Without this mechanism, we need to have the component fully
   * controlled with both checked and onChange attributes and its
   * state will be managed entirely externally.
   */
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = selected;
    }
  }, [inputRef, selected]);

  return (
    <>
      <div className={classes('item')} {...attrs}>
        <input
          ref={inputRef}
          className={classes('input')}
          id={id}
          name={name}
          type='radio'
          value={option.value}
          disabled={option.disabled}
        />
        <label className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`} htmlFor={id} disabled={option.disabled}>
          {option.label}
        </label>
        {option.hint && (
          <Hint id={`${id}-hint`} className={`${DEFAULT_HINT_CLASS} ${classes('hint')}`}>
            {option.hint}
          </Hint>
        )}
      </div>
      {selected && Array.isArray(option.nestedJSX) && <div className={classes('conditional')}>
        {option.nestedJSX.map((nested, index) => {
          return <React.Fragment key={option.nested[index].id}>{nested}</React.Fragment>
        })}
      </div>}
    </>
  );
};

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  option: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      hint: PropTypes.string,
      disabled: PropTypes.bool,
      nested: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string,
          type: PropTypes.string.isRequired
        })
      )
    }),
    PropTypes.string
  ]).isRequired,
  selected: PropTypes.bool,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Radio.defaultProps = {
  selected: false,
  classBlock: DEFAULT_CLASS
};

export default Radio;
