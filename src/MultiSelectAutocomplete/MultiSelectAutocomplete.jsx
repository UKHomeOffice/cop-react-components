/**
 * EXPERIMENTAL
 * 
 * If this replaces the current "Autocomplete" in the future,
 * the "MultiSelectAutocomplete" should remain an alias or else
 * it would have to be a major release and not backwards compatible.
 */

import React, { useRef } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import Readonly from '../Readonly';

import { getTemplates } from './MultiSelectAutocomplete.utils';

import { concatClasses } from '../utils/Utils';

import './MultiSelectAutocomplete.scss';

export const DEFAULT_CLASS = 'hods-multi-select-autocomplete';

const DEFAULT_VALUE = { value: "", label: "Select..." };
const GOVUK_COLOR_BLUE = '#1d70b8';
const GOV_COLOR_BLACK = '#000000';
const GOV_COLOR_WHITE = '#ffffff';
const GOV_COLOR_RED = '#d4351c';
const GOV_COLOR_NONE = '';

const MultiSelectAutocomplete = ({
  id,
  fieldId,
  disabled,
  error,
  readonly,
  item,
  value,
  options,
  isMulti,
  templates: _templates,
  onChange,
  onConfirm: _onConfirm,
  className: _className,
  ...attrs
}) => {
  const aacRef = useRef(null);
  const className = concatClasses(_className, error ? 'error' : undefined);
  const templates = getTemplates(_templates, item);

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
   * As this underlying component has two ways is handling is selected state, this method handles 
   * isSelected for single select.
   */
  const isSelected = (state) => {
    return state.data === state.selectProps.value;
  };

  /**
   * Provides another layer of customization for the autocomplete component (enables and disabled features, 
   * inclusing overriding some default behaviour).
   */
  const customComponents = { 
    DropdownIndicator:() => null,
    ClearIndicator:() => null,
    IndicatorSeparator:() => null,
    NoOptionsMessage:() => 'No results found',
  };

  /**
   * Primarily styles the options items within the menu list based on the state of the option
   * (Some of the desired behaviour can be achieve through regular css styling howver,
   * this allows for handling multiple conditions).
   */
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      ...(((state.isSelected || isSelected(state)) || (!state.isFocused && !state.isSelected)) 
        && {
        backgroundColor: GOV_COLOR_NONE,
        color: GOV_COLOR_BLACK
      }),
      ...(((state.isFocused && (state.isSelected || isSelected(state))) 
      || (state.isFocused && (!state.isSelected || !isSelected(state)))) && {
        backgroundColor: GOVUK_COLOR_BLUE,
        color: GOV_COLOR_WHITE
      }),
    }),
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
      primary50: GOVUK_COLOR_BLUE,
      primary25: GOVUK_COLOR_BLUE,
      dangerLight: GOV_COLOR_RED
    },
  });

  if (readonly) {
    let displayValue = '';
    if(Array.isArray(value)){
      const itemLabels = value.map((v) => templates.inputValue(v)); 
      const lastItem = itemLabels.pop();
      if(itemLabels.length > 0) {
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
        isMulti ? undefined : DEFAULT_VALUE,
        ...options
      ].filter(o => !!o)}
      isMulti={isMulti}
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
  isMulti: PropTypes.bool,
  /** Functions for formatting the labels that appear in the options menu and in the input when a selection is made. */
  templates: PropTypes.shape({ inputValue: PropTypes.func.isRequired, suggestion: PropTypes.func.isRequired }),
  /** Handler for when the value changes. */
  onChange: PropTypes.func,
  /** Deprecated. Use onChange. */
  onConfirm: PropTypes.func,
  className: PropTypes.string
};

MultiSelectAutocomplete.defaultProps = {
  classBlock: DEFAULT_CLASS,
  value: DEFAULT_VALUE,
};

export default MultiSelectAutocomplete;
