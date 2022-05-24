import React from 'react';
import MultiSelectAutocomplete, { DEFAULT_CLASS } from './MultiSelectAutocomplete';
import renderer from 'react-test-renderer';

describe('MultiSelectAutocomplete', () => {
  const AUTOCOMPLETE_ID = 'autocompleteId';
  const AUTOCOMPLETE_FIELD_ID = 'autocompleteFieldId';
  const AUTOCOMPLETE_TEST_ID = 'autocompleteTestId';
  const VALUES = [
    { value: "alpha", label: "alpha" },
    { value: "bravo", label: "bravo" }
  ]

  it('should render when disabled flag is set', async () => {
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      'data-testid': AUTOCOMPLETE_TEST_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: VALUES[0],
      options: VALUES,
      disabled: true
    };

    const tree = renderer.create(<MultiSelectAutocomplete {...OPTIONS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a fully wired-up autocomplete component', async () => {
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: [],
      options: VALUES,
      disabled: false,
      isMulti: false,
      className:DEFAULT_CLASS
    };
    
    const tree = renderer.create(<MultiSelectAutocomplete {...OPTIONS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an input with disabled flag set and the error flag set', async () => {
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: [],
      options: VALUES,
      disabled: true,
      isMulti: false,
      className:DEFAULT_CLASS,
      error: 'Error'
    };

    const tree = renderer.create(<MultiSelectAutocomplete {...OPTIONS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render an autocomplete component with an error control', async () => {
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      'data-testid': AUTOCOMPLETE_TEST_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: VALUES[0],
      options: VALUES,
      disabled: false,
      error: 'Error'
    };

    const tree = renderer.create(<MultiSelectAutocomplete {...OPTIONS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render an autocomplete component with a preselected value of "${VALUES[0].value}"`, async () => {
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: [VALUES[0]],
      options: VALUES,
      disabled: false,
      isMulti: false,
      className:DEFAULT_CLASS
    };
    const tree = renderer.create(<MultiSelectAutocomplete {...OPTIONS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render an autocomplete component with a preselected value of "${VALUES[1].value}"`, async () => {
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: [VALUES[1]],
      options: VALUES,
      disabled: false,
      isMulti: false,
      className:DEFAULT_CLASS
    };
    const tree = renderer.create(<MultiSelectAutocomplete {...OPTIONS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render an autocomplete component in multi select mode with preselected value of ${VALUES[0].value}`, async () => {
    
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: [VALUES[0]],
      options: VALUES,
      disabled: false,
      isMulti: true,
      className:DEFAULT_CLASS,
      onChange: jest.fn()
    };
    
    const tree = renderer.create(<MultiSelectAutocomplete {...OPTIONS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render an autocomplete component in multi select mode with preselected values of ${VALUES[0].value}, ${VALUES[1].value} `, async () => {
    
    const OPTIONS = {
      id: AUTOCOMPLETE_ID,
      fieldId: AUTOCOMPLETE_FIELD_ID,
      value: [...VALUES],
      options: VALUES,
      disabled: false,
      isMulti: true,
      className:DEFAULT_CLASS,
      onChange: jest.fn()
    };
    
    const tree = renderer.create(<MultiSelectAutocomplete {...OPTIONS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
