/**
 * EXPERIMENTAL
 * 
 * If this replaces the current "Autocomplete" in the future,
 * the "MultiSelectAutocomplete" should remain an alias or else
 * it would have to be a major release and not backwards compatible.
 */

import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import Readonly from '../Readonly';

import { getTemplates } from '../Autocomplete/Autocomplete.utils';

import { concatClasses } from '../utils/Utils';

import './MultiSelectAutocomplete.scss';

export const DEFAULT_CLASS = 'hods-multi-select-autocomplete';

const DEFAULT_VALUE = { value: "", label: "Select..." };

const COLOURS = {
  BLUE: '#1d70b8',
  BLACK: '#000000',
  WHITE: '#ffffff',
  RED: '#d4351c',
  NONE: ''
}
const STATE_COLOURS = {
  FOCUSED: { backgroundColor: COLOURS.BLUE, color: COLOURS.WHITE },
  UNFOCUSED: { backgroundColor: COLOURS.NONE, color: COLOURS.BLACK }
};

const MultiSelectAutocomplete = ({
  id,
  fieldId,
  disabled,
  error,
  readonly,
  item,
  value,
  options: _options,
  multi,
  templates: _templates,
  onChange,
  onConfirm: _onConfirm,
  className: _className,
  ...attrs
}) => {
  const [options, setOptions] = useState([]);
  const aacRef = useRef(null);
  const className = concatClasses(_className, error ? 'error' : undefined);
  const templates = getTemplates(_templates, item);

  useEffect(() => {
    if (Array.isArray(_options)) {
      setOptions(_options.map(opt => {
        return {
          ...opt,
          value: opt[item.value],
          label: opt[item.label],
        };
      }))
    } else {
      setOptions([]);
    }
  }, [_options, item, setOptions]);

  const onItemSelected = (selection) => {
    if (typeof onChange === 'function') {
      onChange({
        target: {
          name: fieldId,
          value: selection !== DEFAULT_VALUE ? selection : undefined 
        }
      });
    }
  };

  const filterOptions = ({ label }, input) => {
    const lcLabel = label.toLowerCase();
    const lcQuery = input ? input.toLowerCase() : '';
    return lcLabel.includes(lcQuery)
  };

  /**
   * Provides another layer of customization for the autocomplete component (enables and disabled features, 
   * inclusing overriding some default behaviour).
   */
  const customComponents = { 
    DropdownIndicator:() => null,
    ClearIndicator:() => null,
    IndicatorSeparator:() => null,
  };

  /**
   * Primarily styles the options items within the menu list based on the state of the option
   * (Some of the desired behaviour can be achieve through regular css styling howver,
   * this allows for handling multiple conditions).
   */
   const customStyles = {
    option: (provided, state) => ({
      ...provided,
      ...(state.isFocused ? STATE_COLOURS.FOCUSED : STATE_COLOURS.UNFOCUSED)
    })
  };

  /**
   * Applies styling to the menu list but primarily sets the highlight colour which
   * appear on the menu list (for when travesing the available options and selecting an option),
   * the remove option button when in multi-select mode.
   */
  const customTheme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary50: COLOURS.BLUE,
      primary25: COLOURS.BLUE,
      primary: COLOURS.BLUE,
      dangerLight: COLOURS.RED
    },
  });

  if (readonly) {
    let displayValue = '';
    if (Array.isArray(value)) {
      const itemLabels = value.map((v) => templates.inputValue(v)); 
      const lastItem = itemLabels.pop();
      if (itemLabels.length > 0) {
        displayValue = `${itemLabels.join(', ')} and ${lastItem}`;
      } else {
        displayValue = lastItem;
      }
    } else {
      displayValue = templates.inputValue(value);
    }
    return (
      <Readonly id={id} className={className} {...attrs}>
        {displayValue}
      </Readonly>
    );
  }

  return (
    <div className={`${DEFAULT_CLASS}__outer-wrapper ${className ?? ''}`}>
      <Select
        components={customComponents}
        styles={customStyles}
        theme={customTheme}
        ref={aacRef}
        id={id}
        fieldId={fieldId}
        classNamePrefix={className}
        value={value}
        filterOption={filterOptions}
        onChange={onItemSelected}
        {...attrs}
        options={[
          multi ? undefined : DEFAULT_VALUE,
          ...options
        ].filter(o => !!o)}
        isMulti={multi}
        openMenuOnClick={false}
        menuShouldScrollIntoView={false}
        isDisabled={disabled}
        isClearable={true}
      />
    </div>
  )
};

MultiSelectAutocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  readonly: PropTypes.bool,
  /** The structure of the item. If this is not provided, it is assumed to be a string. */
  item: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    format: PropTypes.string
  }),
  /** The selected item. */
  value: PropTypes.any,
  /** The autocomplete options */
  options: PropTypes.arrayOf(PropTypes.object),
  /** Controls which slelection mode the component is rendered with. */
  multi: PropTypes.bool,
  /** Functions for formatting the labels that appear in the options menu and in the input when a selection is made. */
  templates: PropTypes.shape({ inputValue: PropTypes.func.isRequired, suggestion: PropTypes.func.isRequired }),
  /** Handler for when the value changes. */
  onChange: PropTypes.func,
  /** Deprecated. Use onChange. */
  onConfirm: PropTypes.func,
  className: PropTypes.string
};

MultiSelectAutocomplete.defaultProps = {
  className: DEFAULT_CLASS,
  value: DEFAULT_VALUE,
  item: { value: 'value', label: 'label' }
};

export default MultiSelectAutocomplete;
