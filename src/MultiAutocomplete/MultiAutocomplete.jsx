import React, { useRef } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import Readonly from '../Readonly';

import { getTemplates } from './MultiAutocomplete.utils';

import { concatClasses } from './Utils';

import './MultiAutocomplete.scss';

export const DEFAULT_CLASS = 'hods-multi-autocomplete';

const DEFAULT_VALUE = { value: "", label: "Select..." };
const GOVUK_COLOR_BLUE = '#1d70b8';
const GOV_COLOR_BLACK = '#000000';
const GOV_COLOR_WHITE = '#ffffff';
const GOV_COLOR_NONE = '';

const MultiAutocomplete = ({
  id,
  fieldId,
  disabled,
  error,
  readonly,
  item,
  value,
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

  const isSelected = (state) => {
    return state.data === state.selectProps.value;
  };

  const selectComponents = { 
    DropdownIndicator:() => null,
    ClearIndicator:() => null,
    IndicatorSeparator:() => null,
    NoOptionsMessage:() => 'No results found',
  };

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
        styles={{
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
        }}
        ref={aacRef}
        {...attrs}
        options={[
          attrs.isMulti ? 
            disabled && undefined : 
              disabled && DEFAULT_VALUE,
          ...attrs.options
        ].filter(o => !!o)}
        id={id}
        fieldId={fieldId}
        components={selectComponents}
        classNamePrefix={className}
        onChange={onItemSelected}
        openMenuOnClick={false}
        filterOption={filterOptions}
        value={value}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          colors: {
              ...theme.colors,
              primary50: GOVUK_COLOR_BLUE,
              primary25: GOVUK_COLOR_BLUE
          },
      })}
      menuShouldScrollIntoView={false}
      isDisabled={disabled}
      />
    </div>
  )
};

MultiAutocomplete.propTypes = {
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
  /** Functions for formatting the labels that appear in the options menu and in the input when a selection is made. */
  templates: PropTypes.shape({ inputValue: PropTypes.func.isRequired, suggestion: PropTypes.func.isRequired }),
  /** Handler for when the value changes. */
  onChange: PropTypes.func,
  /** Deprecated. Use onChange. */
  onConfirm: PropTypes.func,
  className: PropTypes.string
};

MultiAutocomplete.defaultProps = {
  classBlock: DEFAULT_CLASS,
  value: DEFAULT_VALUE,
};

export default MultiAutocomplete;
