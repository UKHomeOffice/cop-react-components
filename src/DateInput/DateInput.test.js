// Global imports
import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';

// Local imports
import DateInput, { DEFAULT_CLASS } from './DateInput';
import { DEFAULT_CLASS as DEFAULT_LABEL_CLASS } from '../Label/Label';
import { DEFAULT_CLASS as DEFAULT_READONLY_CLASS } from '../Readonly';

describe('DateInput', () => {
  const checkSetup = (container, testId) => {
    const wrapper = getByTestId(container, testId);
    return wrapper;
  };

  it('should appropriately set up the necessary components', async () => {
    const ID = 'dateinput';
    const FIELD_ID = 'dateinputId';
    const { container } = render(<DateInput data-testid={ID} id={ID} fieldId={FIELD_ID} />);
    const wrapper = checkSetup(container, ID);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}`);

    expect(wrapper.childNodes.length).toEqual(3); // 3 for day, month, year

    //day
    const day = wrapper.childNodes[0];
    expect(day.classList).toContain(`${DEFAULT_CLASS}__item`);

    const dayLabel = day.childNodes[0];
    expect(dayLabel.classList).toContain(DEFAULT_LABEL_CLASS);
    expect(dayLabel.textContent).toEqual('Day');

    const dayInput = day.childNodes[1];
    expect(dayInput.classList).toContain('govuk-input--width-2');
    expect(dayInput.id).toEqual(`${ID}-day`);
    expect(dayInput.name).toEqual(`${FIELD_ID}-day`);

    //month
    const month = wrapper.childNodes[1];
    expect(month.classList).toContain(`${DEFAULT_CLASS}__item`);

    const monthLabel = month.childNodes[0];
    expect(monthLabel.classList).toContain(DEFAULT_LABEL_CLASS);
    expect(monthLabel.textContent).toEqual('Month');

    const monthInput = month.childNodes[1];
    expect(monthInput.classList).toContain('govuk-input--width-2');
    expect(monthInput.id).toEqual(`${ID}-month`);
    expect(monthInput.name).toEqual(`${FIELD_ID}-month`);

    //year
    const year = wrapper.childNodes[2];
    expect(year.classList).toContain(`${DEFAULT_CLASS}__item`);

    const yearLabel = year.childNodes[0];
    expect(yearLabel.classList).toContain(DEFAULT_LABEL_CLASS);
    expect(yearLabel.textContent).toEqual('Year');

    const yearInput = year.childNodes[1];
    expect(yearInput.classList).toContain('govuk-input--width-4');
    expect(yearInput.id).toEqual(`${ID}-year`);
    expect(yearInput.name).toEqual(`${FIELD_ID}-year`);
  });

  it('should show errors with appropriate styling', async () => {
    const ID = 'dateinput';
    const FIELD_ID = 'dateinputId';
    const { container } = render(
      <DateInput
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        error={{ year: true, month: true, day: true }}
      />
    );
    const wrapper = checkSetup(container, ID);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}`);

    //day
    const day = wrapper.childNodes[0];
    const dayInput = day.childNodes[1];
    expect(dayInput.classList).toContain('govuk-input--error');

    //month
    const month = wrapper.childNodes[1];
    const monthInput = month.childNodes[1];
    expect(monthInput.classList).toContain('govuk-input--error');

    //year
    const year = wrapper.childNodes[2];
    const yearInput = year.childNodes[1];
    expect(yearInput.classList).toContain('govuk-input--error');
  });

  it('should update values when entered', async () => {
    const ID = 'dateinput';
    const FIELD_ID = 'dateinputId';

    let onChangeCalls = 0;
    const ON_CHANGE = () => {
      onChangeCalls++;
    };

    const { container } = render(
      <DateInput
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        error={{ year: true, month: true, day: true }}
        value={{ day: 6, month: 3, year: 2076 }}
        onChange={ON_CHANGE}
      />
    );
    const wrapper = checkSetup(container, ID);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}`);

    //day
    const dayInput = wrapper.childNodes[0].childNodes[1];
    expect(dayInput.value).toEqual('6');
    fireEvent.change(dayInput, { target: { name: FIELD_ID, value: 12 } });
    expect(onChangeCalls).toEqual(2);

    //month
    const monthInput = wrapper.childNodes[1].childNodes[1];
    expect(monthInput.value).toEqual('3');
    fireEvent.change(monthInput, { target: { value: 2 } });
    expect(onChangeCalls).toEqual(3);

    //year
    const yearInput = wrapper.childNodes[2].childNodes[1];
    expect(yearInput.value).toEqual('2076');
    fireEvent.change(yearInput, { target: { value: 1999 } });
    expect(onChangeCalls).toEqual(4);
  });

  it('should appropriately set up the necessary components when read only', async () => {
    const ID = 'dateinput';
    const FIELD_ID = 'dateinputId';
    const { container } = render(
      <DateInput
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        value='12-12-2012'
        readonly
      />
    );
    const input = checkSetup(container, ID);
    expect(input.tagName).toEqual('DIV');
    expect(input.classList).toContain(DEFAULT_READONLY_CLASS);
    expect(input.textContent).toEqual('12 December 2012');
  });

  it('should convert month number values to the word equivalent', async () => {
    const ID = 'dateinput';
    const FIELD_ID = 'dateinputId';
    const { container } = render(
      <DateInput
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        value={'6-7-2076'}
        readonly
      />
    );
    const input = checkSetup(container, ID);
    expect(input.tagName).toEqual('DIV');
    expect(input.classList).toContain(DEFAULT_READONLY_CLASS);
    expect(input.textContent).toEqual('6 July 2076');
  });
});
