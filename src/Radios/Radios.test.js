// Global imports
import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';

// Local imports
import Radios, { DEFAULT_CLASS } from './Radios';
import { DEFAULT_CLASS as DEFAULT_READONLY_CLASS } from '../Readonly';

describe('Radios', () => {

  const OPTIONS = [
    { value: 'england', label: 'England' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'wales', label: 'Wales' },
    { value: 'northern-ireland', label: 'Northern Ireland' }
  ];

  const checkSetup = (container, testId) => {
    const wrapper = getByTestId(container, testId);
    expect(wrapper.classList).toContain(DEFAULT_CLASS);
    return wrapper;
  };

  const checkValueChange = (id, fieldId, rerender, value, wrapper) => {
    const checkedValue = typeof(value) === 'object' ? value?.value : value;
    rerender(
      <Radios data-testid={id} id={id} fieldId={fieldId} options={OPTIONS} value={value} />
    );
    OPTIONS.forEach((opt, index) => {
      const prevSelected = OPTIONS[index > 0 ? index - 1 : index].value === value?.value;
      if(!prevSelected){
        const input = wrapper.childNodes[index].childNodes[0];
        expect(input.checked).toEqual(opt.value === checkedValue);
      }
    });
  };

  it('should appropriately set up the necessary components', async () => {
    const ID = 'radios';
    const FIELD_ID = 'radiosFieldId';
    const { container } = render(
      <Radios data-testid={ID} id={ID} fieldId={FIELD_ID} options={OPTIONS} />
    );
    const wrapper = checkSetup(container, ID);
    // Options.
    expect(wrapper.childNodes.length).toEqual(OPTIONS.length);
    OPTIONS.forEach((opt, index) => {
      const item = wrapper.childNodes[index];
      expect(item.classList).toContain(`${DEFAULT_CLASS}__item`);
      expect(item.innerHTML).toContain(opt.label);
      const input = item.childNodes[0];
      expect(input.id).toEqual(`${FIELD_ID}-${index}`);
      expect(input.name).toEqual(FIELD_ID);
      expect(input.value).toEqual(opt.value);
      expect(input.checked).toEqual(false);
    });
  });

  it('should handle a change to the value', async () => {
    const ID = 'radios';
    const FIELD_ID = 'radiosFieldId';
    const { container, rerender } = render(
      <Radios data-testid={ID} id={ID} fieldId={FIELD_ID} options={OPTIONS} />
    );
    const wrapper = checkSetup(container, ID);
    OPTIONS.forEach((_, index) => {
      const input = wrapper.childNodes[index].childNodes[0];
      expect(input.checked).toEqual(false);
    });
    checkValueChange(ID, FIELD_ID, rerender, OPTIONS[2], wrapper);
    checkValueChange(ID, FIELD_ID, rerender, OPTIONS[0], wrapper);
    checkValueChange(ID, FIELD_ID, rerender, OPTIONS[1], wrapper);
    checkValueChange(ID, FIELD_ID, rerender, null, wrapper);
  });

  it('should handle clicking on one of the options', async () => {
    const ID = 'radios';
    const FIELD_ID = 'radiosFieldId';
    const CHANGE_EVENTS = [];
    const ON_CHANGE = (e) => {
      CHANGE_EVENTS.push(e.target.value);
    };
    const { container } = render(
      <Radios data-testid={ID} id={ID} fieldId={FIELD_ID} options={OPTIONS} onChange={ON_CHANGE} />
    );
    const wrapper = checkSetup(container, ID);
    const input = wrapper.childNodes[2].childNodes[0]; // Third option (Wales).
    expect(CHANGE_EVENTS.length).toEqual(0);
    fireEvent.click(input);
    expect(CHANGE_EVENTS.length).toEqual(1);
    expect(CHANGE_EVENTS[0]).toEqual(OPTIONS[2].value);
  });

  it('should accept the readonly flag', async () => {
    const ID = 'radio';
    const FIELD_ID = 'fieldId';
    const { container } = render(
      <Radios data-testid={ID} id={ID} fieldId={FIELD_ID} options={OPTIONS} value={OPTIONS[0]} readonly={true} />
    );
    const radios = getByTestId(container, ID);
    expect(radios.tagName).toEqual('DIV');
    expect(radios.classList).toContain(DEFAULT_READONLY_CLASS);
    expect(radios.innerHTML).toContain(OPTIONS[0].label);
  });

});
