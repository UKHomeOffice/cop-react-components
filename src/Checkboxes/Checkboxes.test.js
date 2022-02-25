// Global imports
import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';

// Local imports
import Checkboxes, { DEFAULT_CLASS } from './Checkboxes';
import { DEFAULT_CLASS as DEFAULT_READONLY_CLASS } from '../Readonly';

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
    const { container } = render(<Checkboxes data-testid={ID} id={ID} fieldId={FIELD_ID} options={OPTIONS} />);
    const wrapper = checkSetup(container, ID);
    expect(wrapper.childNodes.length).toEqual(OPTIONS.length);

    OPTIONS.forEach((opt, index) => {
      const item = wrapper.childNodes[index];
      expect(item.classList).toContain(`${DEFAULT_CLASS}__item`);
      expect(item.innerHTML).toContain(opt.label);
      const input = item.childNodes[0];
      expect(input.id).toEqual(`${FIELD_ID}-${index}`);
      expect(input.name).toEqual(`${FIELD_ID}-${index}`);
      expect(input.value).toEqual(opt.value);
      expect(input.checked).toEqual(false);
    });
  });

  it('should trigger onChange with selected values', async () => {
    const ID = 'checkboxes';
    const FIELD_ID = 'checkboxesFieldId';
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (value) => {
      ON_CHANGE_CALLS.push(value);
    };
    const { container } = render(
      <Checkboxes data-testid={ID} id={ID} fieldId={FIELD_ID} options={OPTIONS} onChange={ON_CHANGE} />
    );
    const wrapper = checkSetup(container, ID);
    const checkboxItems = wrapper.childNodes;

    fireEvent.click(checkboxItems[0].childNodes[0]); // england
    expect(ON_CHANGE_CALLS.length).toEqual(2);
    expect(ON_CHANGE_CALLS[1]).toMatchObject({
      target: {
        name: FIELD_ID,
        value: [OPTIONS[0].value],
      },
    });
    fireEvent.click(checkboxItems[1].childNodes[0]); // scotland
    expect(ON_CHANGE_CALLS.length).toEqual(3);
    expect(ON_CHANGE_CALLS[2]).toMatchObject({
      target: {
        name: FIELD_ID,
        value: [OPTIONS[0].value, OPTIONS[1].value],
      },
    });
    fireEvent.click(checkboxItems[0].childNodes[0]); // england (unchecked this time)
    expect(ON_CHANGE_CALLS.length).toEqual(4);
    expect(ON_CHANGE_CALLS[3]).toMatchObject({
      target: {
        name: FIELD_ID,
        value: [OPTIONS[1].value],
      },
    });
  });

  it('should appropriately render in readonly mode', async () => {
    const ID = 'checkboxes';
    const FIELD_ID = 'checkboxesFieldId';
    const { container } = render(
      <Checkboxes
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        options={OPTIONS}
        value={['england', 'scotland']}
        readonly
      />
    );
    const readOnlyCheckbox = getByTestId(container, ID);

    expect(readOnlyCheckbox.tagName).toEqual('DIV');
    expect(readOnlyCheckbox.classList).toContain(DEFAULT_READONLY_CLASS);
    expect(readOnlyCheckbox.innerHTML).toContain('England<br>Scotland<br>');
  });

  it('should appropriately render with checkboxes prechecked', async () => {
    const ID = 'checkboxes';
    const FIELD_ID = 'checkboxesFieldId';
    const { container } = render(
      <Checkboxes data-testid={ID} id={ID} fieldId={FIELD_ID} options={OPTIONS} value={['england', 'wales']}/>
    );
    const wrapper = checkSetup(container, ID);
    const checkboxItems = wrapper.childNodes;
    expect(checkboxItems[0].childNodes[0].checked).toEqual(true); //First option England
    expect(checkboxItems[1].childNodes[0].checked).toEqual(false); //Second option Scotland
    expect(checkboxItems[2].childNodes[0].checked).toEqual(true); //Third option Wales

  });
});
