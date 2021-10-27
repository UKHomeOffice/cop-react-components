import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import VisuallyHidden from './VisuallyHidden';

describe('VisuallyHidden', () => {

  const checkSetup = (container, testId) => {
    const visuallyHidden = getByTestId(container, testId);
    expect(visuallyHidden.classList).toContain('govuk-visually-hidden');
    return visuallyHidden;
  };

  it('should include the appropriate text', async () => {
    const VISUALLY_HIDDEN_ID = 'text';
    const VISUALLY_HIDDEN_TEXT = 'Invisible Hello World';
    const { container } = render(
      <VisuallyHidden data-testid={VISUALLY_HIDDEN_ID}>{VISUALLY_HIDDEN_TEXT}</VisuallyHidden>
    );
    const visuallyHidden = checkSetup(container, VISUALLY_HIDDEN_ID);
    expect(visuallyHidden.innerHTML).toEqual(VISUALLY_HIDDEN_TEXT);
  });

  it('should include the appropriate markup', async () => {
    const VISUALLY_HIDDEN_ID = 'markup';
    const INNER_DIV_ID = 'inner-div';
    const INNER_DIV_TEXT = 'Inner div text';
    const VISUALLY_HIDDEN_MARKUP = <div data-testid={INNER_DIV_ID}>
      {INNER_DIV_TEXT}
    </div>;
    const { container } = render(
      <VisuallyHidden data-testid={VISUALLY_HIDDEN_ID}>{VISUALLY_HIDDEN_MARKUP}</VisuallyHidden>
    );
    const visuallyHidden = checkSetup(container, VISUALLY_HIDDEN_ID);
    const innerDiv = getByTestId(visuallyHidden, INNER_DIV_ID);
    expect(innerDiv.innerHTML).toEqual(INNER_DIV_TEXT);
  });

});
