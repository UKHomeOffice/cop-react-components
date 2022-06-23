import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import WarningText from './WarningText';

describe('WarningText', () => {

  const checkSetup = (container, testId) => {
    const warningText = getByTestId(container, testId);
    expect(warningText.classList).toContain('govuk-warning-text');
    return warningText;
  };

  it('should display the appropriate text', async () => {
    const TEXT_ID = 'warning';
    const TEXT = 'Hello warning World';
    const { container } = render(
      <WarningText data-testid={TEXT_ID}>{TEXT}</WarningText>
    );
    const warningText = checkSetup(container, TEXT_ID);
    expect(warningText.innerHTML).toContain(TEXT);
  });

  it('should display the appropriate markup', async () => {
    const TEXT_ID = 'markup';
    const INNER_DIV_ID = 'inner-div';
    const INNER_DIV_TEXT = 'Alert message text';
    const INNER_MARKUP = <div data-testid={INNER_DIV_ID}>
      {INNER_DIV_TEXT}
    </div>;
    const { container } = render(
      <WarningText data-testid={TEXT_ID}>{INNER_MARKUP}</WarningText>
    );
    const warningText = checkSetup(container, TEXT_ID);
    const innerDiv = getByTestId(warningText, INNER_DIV_ID);
    expect(innerDiv.innerHTML).toEqual(INNER_DIV_TEXT);
  });

});