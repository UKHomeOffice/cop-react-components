// Global imports
import React from 'react';
import { getByTestId, render } from '@testing-library/react';

// Local imports
import Radio, { DEFAULT_CLASS } from './Radio';

describe('Radio', () => {

  const checkSetup = (container, testId) => {
    const wrapper = getByTestId(container, testId);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}__item`);
    const input = wrapper.childNodes[0];
    const label = wrapper.childNodes[1];
    const hint = wrapper.childNodes[2];
    return { wrapper, input, label, hint };
  };

  it('should appropriately set up the necessary components', async () => {
    const ID = 'radio';
    const FIELD_ID = 'radioFieldId';
    const OPTION = { value: 'england', label: 'England' };
    const { container } = render(
      <Radio data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} />
    );
    const { input, label, hint } = checkSetup(container, ID);
    // Input
    expect(input.tagName).toEqual('INPUT');
    expect(input.type).toEqual('radio');
    expect(input.id).toEqual(ID);
    expect(input.name).toEqual(FIELD_ID);
    expect(input.value).toEqual(OPTION.value);
    expect(input.classList).toContain(`${DEFAULT_CLASS}__input`);
    expect(input.getAttribute('disabled')).toBeNull();
    // Label
    expect(label.classList).toContain(`${DEFAULT_CLASS}__label`);
    expect(label.innerHTML).toEqual(OPTION.label);
    expect(label.getAttribute('for')).toEqual(ID);
    expect(label.getAttribute('disabled')).toBeNull();
    // No hint
    expect(hint).toBeUndefined();
  });

  it('should appropriately set up the necessary components with a hint', async () => {
    const ID = 'radio';
    const FIELD_ID = 'radioFieldId';
    const OPTION = { value: 'england', label: 'England', hint: 'This is a hint' };
    const { container } = render(
      <Radio data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} />
    );
    const { input, label, hint } = checkSetup(container, ID);
    // Input
    expect(input).toBeDefined();
    // Label
    expect(label).toBeDefined();
    // No hint
    expect(hint).toBeDefined();
    expect(hint.classList).toContain(`${DEFAULT_CLASS}__hint`);
    expect(hint.innerHTML).toEqual(OPTION.hint);
    expect(hint.id).toEqual(`${ID}-hint`);
  });

  it('should not be checked by default', async () => {
    const ID = 'radio';
    const FIELD_ID = 'radioFieldId';
    const OPTION = { value: 'england', label: 'England' };
    const { container } = render(
      <Radio data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} />
    );
    const { input } = checkSetup(container, ID);
    expect(input.checked).toEqual(false);
  });

  it('should not be checked when selected is set to false', async () => {
    const ID = 'radio';
    const FIELD_ID = 'radioFieldId';
    const OPTION = { value: 'england', label: 'England' };
    const { container } = render(
      <Radio data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} selected={false} />
    );
    const { input } = checkSetup(container, ID);
    expect(input.checked).toEqual(false);
  });

  it('should be checked when selected is set to true', async () => {
    const ID = 'radio';
    const FIELD_ID = 'radioFieldId';
    const OPTION = { value: 'england', label: 'England' };
    const { container } = render(
      <Radio data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} selected={true} />
    );
    const { input } = checkSetup(container, ID);
    expect(input.checked).toEqual(true);
  });

  it('should toggle checked when selected changes value', async () => {
    const ID = 'radio';
    const FIELD_ID = 'radioFieldId';
    const OPTION = { value: 'england', label: 'England' };
    const { container, rerender } = render(
      <Radio data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} />
    );
    const { input } = checkSetup(container, ID);
    expect(input.checked).toEqual(false);
    // Use re-render to pass a new selected value.
    rerender(<Radio data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} selected={true} />);
    expect(input.checked).toEqual(true);
    // And toggle it back to false.
    rerender(<Radio data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} selected={false} />);
    expect(input.checked).toEqual(false);
  });

});