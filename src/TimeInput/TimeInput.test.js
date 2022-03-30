// Global imports
import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';

// Local imports
import TimeInput, { DEFAULT_CLASS } from './TimeInput';
import { DEFAULT_CLASS as DEFAULT_LABEL_CLASS } from '../Label/Label';
import { DEFAULT_CLASS as DEFAULT_READONLY_CLASS } from '../Readonly';

describe('TimeInput', () => {
  const checkSetup = (container, testId) => {
    const wrapper = getByTestId(container, testId);
    return wrapper;
  };

  it('should appropriately set up the necessary components', async () => {
    const ID = 'timeinput';
    const FIELD_ID = 'timeinputId';
    const { container } = render(<TimeInput data-testid={ID} id={ID} fieldId={FIELD_ID} />);
    const wrapper = checkSetup(container, ID);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}`);

    expect(wrapper.childNodes.length).toEqual(2); // 2 for hour, minute

    /**** Hour ****/
    const hour = wrapper.childNodes[0];
    expect(hour.classList).toContain(`${DEFAULT_CLASS}__item`);

    const hourLabel = hour.childNodes[0];
    expect(hourLabel.classList).toContain(DEFAULT_LABEL_CLASS);
    expect(hourLabel.textContent).toEqual('Hour');

    const hourInout = hour.childNodes[1];
    expect(hourInout.classList).toContain('govuk-input--width-2');
    expect(hourInout.id).toEqual(`${ID}-hour`);
    expect(hourInout.name).toEqual(`${FIELD_ID}-hour`);

    /**** Mintue ****/
    const minute = wrapper.childNodes[1];
    expect(minute.classList).toContain(`${DEFAULT_CLASS}__item`);

    const minuteLabel = minute.childNodes[0];
    expect(minuteLabel.classList).toContain(DEFAULT_LABEL_CLASS);
    expect(minuteLabel.textContent).toEqual('Minute');

    const minuteInput = minute.childNodes[1];
    expect(minuteInput.classList).toContain('govuk-input--width-2');
    expect(minuteInput.id).toEqual(`${ID}-minute`);
    expect(minuteInput.name).toEqual(`${FIELD_ID}-minute`);

  });

  it('should show errors with appropriate styling', async () => {
    const ID = 'timeinput';
    const FIELD_ID = 'timeinputId';
    const { container } = render(
      <TimeInput
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        error={{ hour: true, minute: true }}
      />
    );
    const wrapper = checkSetup(container, ID);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}`);

    //hour
    const hour = wrapper.childNodes[0];
    const hourInput = hour.childNodes[1];
    expect(hourInput.classList).toContain('govuk-input--error');

    //minute
    const minute = wrapper.childNodes[1];
    const minuteInput = minute.childNodes[1];
    expect(minuteInput.classList).toContain('govuk-input--error');

    
  });

  it('should update values when entered', async () => {
    const ID = 'timeinput';
    const FIELD_ID = 'timeinputId';

    let onChangeCalls = 0;
    const ON_CHANGE = () => {
      onChangeCalls++;
    };

    const { container } = render(
      <TimeInput
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        error={{ hour: true, minute: true }}
        value={{ hour: 14, minute: 30}}
        onChange={ON_CHANGE}
      />
    );
    const wrapper = checkSetup(container, ID);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}`);

    //hour
    const hourInput = wrapper.childNodes[0].childNodes[1];
    expect(hourInput.value).toEqual('14');
    fireEvent.change(hourInput, { target: { name: FIELD_ID, value: 1 } });
    expect(onChangeCalls).toEqual(1);

    //minute
    const minuteInput = wrapper.childNodes[1].childNodes[1];
    expect(minuteInput.value).toEqual('30');
    fireEvent.change(minuteInput, { target: { value: 2 } });
    expect(onChangeCalls).toEqual(2);

    
  });

  it('should appropriately set up the necessary components when read only', async () => {
    const ID = 'timeinputId';
    const FIELD_ID = 'timeinputId';
    const { container } = render(
      <TimeInput
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        value={{ hour:14, minute:30 }}
        readonly
      />
    );
    const input = checkSetup(container, ID);
    expect(input.tagName).toEqual('DIV');
    expect(input.classList).toContain(DEFAULT_READONLY_CLASS);
    expect(input.textContent).toEqual("14:30");
  });


});
