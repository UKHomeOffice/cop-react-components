import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Hint from './Hint';

describe('Hint', () => {

  const checkSetup = (container, testId) => {
    const hint = getByTestId(container, testId);
    expect(hint.classList).toContain('govuk-hint');
    return hint;
  };

  it('should display the appropriate text in the hint', async () => {
    const HINT_ID = 'embedded';
    const HINT_TEXT = 'Hello Hint World';
    const { container } = render(
      <Hint data-testid={HINT_ID}>{HINT_TEXT}</Hint>
    );
    const hint = checkSetup(container, HINT_ID);
    expect(hint.innerHTML).toEqual(HINT_TEXT);
  });

  it('should display the appropriate markup in the hint', async () => {
    const HINT_ID = 'markup';
    const INNER_DIV_ID = 'inner-div';
    const INNER_DIV_TEXT = 'Inner div text';
    const HINT_MARKUP = <div data-testid={INNER_DIV_ID}>
      {INNER_DIV_TEXT}
    </div>;
    const { container } = render(
      <Hint data-testid={HINT_ID}>{HINT_MARKUP}</Hint>
    );
    const hint = checkSetup(container, HINT_ID);
    const innerDiv = getByTestId(hint, INNER_DIV_ID);
    expect(innerDiv.innerHTML).toEqual(INNER_DIV_TEXT);
  });

});
