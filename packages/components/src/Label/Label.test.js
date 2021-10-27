import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Label, { OPTIONAL_SUFFIX } from './Label';

describe('Label', () => {

  const checkSetup = (container, testId) => {
    const label = getByTestId(container, testId);
    expect(label.getAttribute('for')).toEqual(testId);
    expect(label.classList).toContain('govuk-label');
    return label;
  };

  it('should include the suffix in an optional label', async () => {
    const LABEL_ID = 'opt';
    const LABEL_TEXT = 'Optional label';
    const { container } = render(
      <Label data-testid={LABEL_ID} id={LABEL_ID}>{LABEL_TEXT}</Label>
    );
    const label = checkSetup(container, LABEL_ID);
    expect(label.innerHTML).toEqual(`${LABEL_TEXT}${OPTIONAL_SUFFIX}`);
  });

  it('should not include the suffix in a required label', async () => {
    const LABEL_ID = 'req';
    const LABEL_TEXT = 'Required label';
    const { container } = render(
      <Label data-testid={LABEL_ID} id={LABEL_ID} required={true}>{LABEL_TEXT}</Label>
    );
    const label = checkSetup(container, LABEL_ID);
    expect(label.innerHTML).toEqual(LABEL_TEXT);
  });

  it('should appropriately embed HTML as a child in an optional label not include the suffix', async () => {
    const LABEL_ID = 'embed';
    const INNER_DIV_ID = 'inner-div';
    const INNER_DIV_TEXT = 'Inner div text';
    const LABEL_MARKUP = <div data-testid={INNER_DIV_ID}>
      {INNER_DIV_TEXT}
    </div>;
    const { container } = render(
      <Label data-testid={LABEL_ID} id={LABEL_ID}>{LABEL_MARKUP}</Label>
    );
    const label = checkSetup(container, LABEL_ID);
    const innerDiv = getByTestId(label, INNER_DIV_ID);
    expect(innerDiv.innerHTML).toEqual(INNER_DIV_TEXT); // No suffix included.
  });

});
