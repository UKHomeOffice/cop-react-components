import React from 'react';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import Select, { DEFAULT_CLASS, DEFAULT_PLACEHOLDER } from './Select';
import { DEFAULT_CLASS as DEFAULT_READONLY_CLASS } from '../Readonly';

describe('Select', () => {

  const checkSetup = (container, testId) => {
    const select = getByTestId(container, testId);
    expect(select.classList).toContain(DEFAULT_CLASS);
    return select;
  };

  it('should be appropriately set up with id and name', async () => {
    const SELECT_ID = 'selectId';
    const SELECT_FIELD_ID = 'selectFieldId';
    const OPTIONS = [
      {
        label: 'Option 1',
        value: 'option1'
      },
      {
        label: 'Option 2',
        value: 'option2'
      }
    ];
    const { container } = render(
      <Select data-testid={SELECT_ID} id={SELECT_ID} fieldId={SELECT_FIELD_ID} options={OPTIONS}/>
    );
    const select = checkSetup(container, SELECT_ID);
    expect(select.tagName).toEqual('SELECT');
    expect(select.name).toEqual(SELECT_FIELD_ID);
    expect(select.value).toEqual('');
    expect(select.getAttribute('disabled')).toBeNull();
  });

  it('should render with a default placeholder', async () => {
    const SELECT_ID = 'selectId';
    const SELECT_FIELD_ID = 'selectFieldId';
    const OPTIONS = [
      {
        label: 'Option 1',
        value: 'option1'
      },
      {
        label: 'Option 2',
        value: 'option2'
      }
    ];
    const { container } = render(
      <Select data-testid={SELECT_ID} id={SELECT_ID} fieldId={SELECT_FIELD_ID} options={OPTIONS}/>
    );
    const select = checkSetup(container, SELECT_ID);
    const selectedOption = select.childNodes[select.selectedIndex];
    expect(select.value).toEqual('');
    expect(selectedOption.innerHTML).toEqual(DEFAULT_PLACEHOLDER);
  });

  it('should render with a custom placeholder', async () => {
    const SELECT_ID = 'selectId';
    const SELECT_FIELD_ID = 'selectFieldId';
    const CUSTOM_PLACEHOLDER = 'Choose an option...';
    const OPTIONS = [
      {
        label: 'Option 1',
        value: 'option1'
      },
      {
        label: 'Option 2',
        value: 'option2'
      }
    ];
    const { container } = render(
      <Select data-testid={SELECT_ID} id={SELECT_ID} fieldId={SELECT_FIELD_ID} options={OPTIONS} placeholder={CUSTOM_PLACEHOLDER}/>
    );
    const select = checkSetup(container, SELECT_ID);
    const selectedOption = select.childNodes[select.selectedIndex];
    expect(select.value).toEqual('');
    expect(selectedOption.innerHTML).toEqual(CUSTOM_PLACEHOLDER);
  });

  it('should render with a default value if one is provided', async () => {
    const SELECT_ID = 'selectId';
    const SELECT_FIELD_ID = 'selectFieldId';
    const DEFAULT_TEXT = 'Option 2'
    const DEFAULT_VALUE = 'option2';
    const OPTIONS = [
      {
        label: 'Option 1',
        value: 'option1'
      },
      {
        label: DEFAULT_TEXT,
        value: DEFAULT_VALUE
      }
    ];
    const { container } = render(
      <Select data-testid={SELECT_ID} id={SELECT_ID} fieldId={SELECT_FIELD_ID} options={OPTIONS} defaultValue={DEFAULT_VALUE}/>
    );
    const select = checkSetup(container, SELECT_ID);
    const selectedOption = select.childNodes[select.selectedIndex];
    expect(select.value).toEqual(DEFAULT_VALUE);
    expect(selectedOption.innerHTML).toEqual(DEFAULT_TEXT);
  });

  it('should accept the readonly flag', async () => {
    const SELECT_ID = 'selectId';
    const SELECT_FIELD_ID = 'selectFieldId';
    const DEFAULT_TEXT = 'Option 2'
    const DEFAULT_VALUE = 'option2';
    const OPTIONS = [
      {
        label: 'Option 1',
        value: 'option1'
      },
      {
        label: DEFAULT_TEXT,
        value: DEFAULT_VALUE
      }
    ];
    const { container } = render(
      <Select data-testid={SELECT_ID} id={SELECT_ID} fieldId={SELECT_FIELD_ID} options={OPTIONS} value={DEFAULT_VALUE} readonly={true} />
    );
    const readonly = getByTestId(container, SELECT_ID);
    expect(readonly.tagName).toEqual('DIV');
    expect(readonly.classList).toContain(DEFAULT_READONLY_CLASS);
    expect(readonly.textContent).toEqual(DEFAULT_TEXT);
  });


  it('should be in an error state when the error is set', async () => {
    const SELECT_ID = 'selectId';
    const SELECT_FIELD_ID = 'selectFieldId';
    const ERROR = 'This is in error';
    const { container } = render(
      <Select data-testid={SELECT_ID} id={SELECT_ID} fieldId={SELECT_FIELD_ID} error={ERROR} />
    );
    const input = checkSetup(container, SELECT_ID);
    expect(input.classList).toContain(`${DEFAULT_CLASS}--error`);
    expect(input.value).toEqual('');
  });

  it('should not be in an error state when the error is an empty string', async () => {
    const SELECT_ID = 'selectId';
    const SELECT_FIELD_ID = 'selectFieldId';
    const ERROR = '';
    const { container } = render(
      <Select data-testid={SELECT_ID} id={SELECT_ID} fieldId={SELECT_FIELD_ID} error={ERROR} />
    );
    const input = checkSetup(container, SELECT_ID);
    expect(input.classList).not.toContain(`${DEFAULT_CLASS}--error`);
    expect(input.value).toEqual('');
  });

  it('should set the value and onChange on the underlying input appropriately', async () => {
    const SELECT_ID = 'select';
    const SELECT_FIELD_ID = 'selectFieldId';
    const VALUE_LABEL = 'Option 1';
    const VALUE = 'option1';
    const OPTIONS = [
      {
        label: VALUE_LABEL,
        value: VALUE
      },
      {
        label: 'Option 2',
        value: 'option2'
      }
    ];
    let onChangeCalls = 0;
    const ON_CHANGE = () => {
      onChangeCalls++;
    };
    const { container } = render(
      <Select
        data-testid={SELECT_ID} id={SELECT_ID} fieldId={SELECT_FIELD_ID}
        value={VALUE} onChange={ON_CHANGE} options={OPTIONS}/>
    );
    const select = checkSetup(container, SELECT_ID);
    const selectedOption = select.childNodes[select.selectedIndex];
    expect(select.value).toEqual(VALUE);
    expect(onChangeCalls).toEqual(0);
    expect(selectedOption.innerHTML).toEqual(VALUE_LABEL);
    const EVENT = { target: { name: SELECT_FIELD_ID, value: VALUE } };
    fireEvent.change(select, EVENT);
    expect(onChangeCalls).toEqual(1);
  });
});
