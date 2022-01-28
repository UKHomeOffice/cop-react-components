// Global imports
import { getByTestId, render } from '@testing-library/react';

// Local imports
import Checkbox, { DEFAULT_CLASS } from './Checkbox';

describe('Checkbox', () => {
  const checkSetup = (container, testId) => {
    const wrapper = getByTestId(container, testId);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}__item`);
    const input = wrapper.childNodes[0];
    const label = wrapper.childNodes[1];
    const hint = wrapper.childNodes[2];
    return { wrapper, input, label, hint };
  };

  it('should appropriately set up the necessary components', async () => {
    const ID = 'checkbox';
    const FIELD_ID = 'checkboxFieldId';
    const OPTION = { value: 'checkableOption', label: 'checkableOption' };
    const { container } = render(
      <Checkbox data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} />
    );
    const { input, label, hint } = checkSetup(container, ID);
    // Input
    expect(input.tagName).toEqual('INPUT');
    expect(input.type).toEqual('checkbox');
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
    const ID = 'checkbox';
    const FIELD_ID = 'checkboxFieldId';
    const OPTION = { value: 'checkableOption', label: 'checkableOption', hint: 'This is a hint' };
    const { container } = render(
      <Checkbox data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} />
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
    const ID = 'checkbox';
    const FIELD_ID = 'checkboxFieldId';
    const OPTION = { value: 'checkableOption', label: 'checkableOption' };
    const { container } = render(
      <Checkbox data-testid={ID} id={ID} name={FIELD_ID} option={OPTION} />
    );
    const { input } = checkSetup(container, ID);
    expect(input.checked).toEqual(false);
  });
  
});
