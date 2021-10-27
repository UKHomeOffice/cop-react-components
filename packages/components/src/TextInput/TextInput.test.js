import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import TextInput, { DEFAULT_CLASS } from './TextInput';

describe('TextInput', () => {

  const checkSetup = (container, testId) => {
    const input = getByTestId(container, testId);
    expect(input.classList).toContain(DEFAULT_CLASS);
    return input;
  };

  it('should be appropriately set up with id and name', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const { container } = render(
      <TextInput data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} />
    );
    const input = checkSetup(container, INPUT_ID);
    expect(input.name).toEqual(INPUT_FIELD_ID);
    expect(input.type).toEqual('text');
    expect(input.value).toEqual('');
    expect(input.getAttribute('disabled')).toBeNull();
  });

  it('should be accept the disabled flag', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const { container } = render(
      <TextInput data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} disabled={true} />
    );
    const input = checkSetup(container, INPUT_ID);
    expect(input.getAttribute('disabled')).not.toBeNull();
  });

  it('should be in an error state when the error is set', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const ERROR = 'This is in error';
    const { container } = render(
      <TextInput data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} error={ERROR} />
    );
    const input = checkSetup(container, INPUT_ID);
    expect(input.classList).toContain(`${DEFAULT_CLASS}--error`);
    expect(input.value).toEqual('');
  });

  it('should not be in an error state when the error is an empty string', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const ERROR = '';
    const { container } = render(
      <TextInput data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} error={ERROR} />
    );
    const input = checkSetup(container, INPUT_ID);
    expect(input.classList).not.toContain(`${DEFAULT_CLASS}--error`);
    expect(input.value).toEqual('');
  });

  it('should set the value and onChange on the underlying input appropriately', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const VALUE = 'This is the value';
    let onChangeCalls = 0;
    const ON_CHANGE = () => {
      onChangeCalls++;
    };
    const { container } = render(
      <TextInput
        data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID}
        value={VALUE} onChange={ON_CHANGE} />
    );
    const input = checkSetup(container, INPUT_ID);
    expect(input.value).toEqual(VALUE);
    expect(onChangeCalls).toEqual(0);
    const EVENT = { target: { name: INPUT_FIELD_ID, value: `${VALUE}.` } };
    fireEvent.change(input, EVENT);
    expect(onChangeCalls).toEqual(1);
  });

});
