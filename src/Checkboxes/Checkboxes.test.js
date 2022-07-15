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
      expect(input.id).toEqual(`${ID}-${index}`);
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
    expect(readOnlyCheckbox.innerHTML).toContain('<div>England</div><div>Scotland</div>');
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

  it('should create a divider between checkboxes', async () => {
    const ID = 'checkboxes';
    const FIELD_ID = 'checkboxesFieldId';

    // Create OPTIONS with divider
    const OPTIONS_WITH_DIVIDER = [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      'or',
      { value: 'wales', label: 'Wales' },
      { value: 'northern-ireland', label: 'Northern Ireland' },
    ];

    // Build checkboxes
    const { container } = render(
      <Checkboxes
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        options={OPTIONS_WITH_DIVIDER}
      />
    );

    const wrapper = checkSetup(container, ID);

    // Expected number of HTML elements to be same as provided options
    expect(wrapper.childNodes.length).toEqual(OPTIONS_WITH_DIVIDER.length);

    // Expect divider fields to be correct
    const divider = wrapper.childNodes[2];
    expect(divider.classList).toContain(`${DEFAULT_CLASS}__divider`);
    expect(divider.innerHTML).toEqual(`or`);
  });

  it('should deselect all other options when an exclusive option is checked', async () => {
    const ID = 'checkboxes';
    const FIELD_ID = 'checkboxesFieldId';

    // Create OPTIONS with an exclusive option
    const OPTIONS_WITH_EXCLUSIVE = [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      { value: 'wales', label: 'Wales' },
      { value: 'northern-ireland', label: 'Northern Ireland' },
      { 
        value: 'citizen-of-another-country',
        label: 'Citizen Of Another Country',
        behaviour: 'exclusive'
      },
    ];
    const EXCLUSIVE_OPTIONS = [
      {
        value: 'citizen-of-another-country',
        label: 'Citizen Of Another Country',
        behaviour: 'exclusive'
      }
    ];
    const NON_EXCLUSIVE_OPTIONS = [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      { value: 'wales', label: 'Wales' },
      { value: 'northern-ireland', label: 'Northern Ireland' }
    ];

    // Build checkboxes
    const { container } = render(
      <Checkboxes
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        options={OPTIONS_WITH_EXCLUSIVE}
      />
    );

    const wrapper = checkSetup(container, ID);

    // Set all non-exclusive options to checked
    NON_EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      fireEvent.click(document.getElementById(input.id));
    });

    // Expect all non-exclusive options to be checked
    NON_EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      expect(input.checked).toEqual(true);
    });

    // Expect the exclusive option to be not checked
    EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      expect(input.checked).toEqual(false);
    })

    // Set the exclusive option to checked
    EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      fireEvent.click(document.getElementById(input.id));
    });

    // Expect the exclusive option to be checked
    EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      expect(input.checked).toEqual(true);
    });

    // Expect all non-exclusive options to be now be not checked
    NON_EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      expect(input.checked).toEqual(false);
    });
  });

  it('should deselect all exclusive options when a non-exclusive option is checked', async () => {
    const ID = 'checkboxes';
    const FIELD_ID = 'checkboxesFieldId';

    // Create OPTIONS with an exclusive option
    const OPTIONS_WITH_EXCLUSIVE = [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      { value: 'wales', label: 'Wales' },
      { value: 'northern-ireland', label: 'Northern Ireland' },
      { 
        value: 'citizen-of-another-country',
        label: 'Citizen Of Another Country',
        behaviour: 'exclusive'
      },
    ];
    const EXCLUSIVE_OPTIONS = [
      {
        value: 'citizen-of-another-country',
        label: 'Citizen Of Another Country',
        behaviour: 'exclusive'
      }
    ];
    const NON_EXCLUSIVE_OPTIONS = [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      { value: 'wales', label: 'Wales' },
      { value: 'northern-ireland', label: 'Northern Ireland' }
    ];

    // Build checkboxes
    const { container } = render(
      <Checkboxes
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        options={OPTIONS_WITH_EXCLUSIVE}
      />
    );

    const wrapper = checkSetup(container, ID);

    // Set the exclusive option to checked
    EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      fireEvent.click(document.getElementById(input.id));
    });

    // Expect the exclusive option to be checked
    EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      expect(input.checked).toEqual(true);
    });

    // Expect the non-exclusive options to be not checked
    NON_EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      expect(input.checked).toEqual(false);
    })

    // Set all non-exclusive options to checked
    NON_EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      fireEvent.click(document.getElementById(input.id));
    });

    // Expect the exclusive option to be now not checked
    EXCLUSIVE_OPTIONS.forEach((opt) => {
      const indexOfOption = OPTIONS_WITH_EXCLUSIVE.findIndex(OPTION => OPTION.value === opt.value);
      const item = wrapper.childNodes[indexOfOption];
      const input = item.childNodes[0];
      expect(input.checked).toEqual(false);
    });
  });
});
