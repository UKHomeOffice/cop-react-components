// Global imports
import { getByTestId, render } from '@testing-library/react';

// Local imports
import Checkboxes, { DEFAULT_CLASS } from './Checkboxes';

describe('Checkboxes', () => {
  const OPTIONS = [
    { value: 'england', label: 'England' },
    { value: 'scotland', label: 'Scotland' },
    { value: 'wales', label: 'Wales' },
    { value: 'northern-ireland', label: 'Northern Ireland' },
  ];

  const checkSetup = (container, testId) => {
    const wrapper = getByTestId(container, testId);
    expect(wrapper.classList).toContain(DEFAULT_CLASS);
    return wrapper;
  };

  it('should appropriately set up the necessary components', async () => {
    const ID = 'checkboxes';
    const FIELD_ID = 'checkboxesFieldId';
    const { container } = render(
      <Checkboxes
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        options={OPTIONS}
      />
    );
    const wrapper = checkSetup(container, ID);
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
});
