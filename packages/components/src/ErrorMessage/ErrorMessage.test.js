import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {

  const checkSetup = (container, testId) => {
    const errorMessage = getByTestId(container, testId);
    expect(errorMessage.classList).toContain('govuk-error-message');
    const firstChild = errorMessage.childNodes[0];
    expect(firstChild.classList).toContain('govuk-visually-hidden');
    expect(firstChild.innerHTML).toEqual('Error:');
    return errorMessage;
  };

  it('should display the appropriate text in the error message', async () => {
    const ERROR_MESSAGE_ID = 'error';
    const ERROR_MESSAGE_TEXT = 'Hello Broken World';
    const { container } = render(
      <ErrorMessage data-testid={ERROR_MESSAGE_ID}>{ERROR_MESSAGE_TEXT}</ErrorMessage>
    );
    const errorMessage = checkSetup(container, ERROR_MESSAGE_ID);
    const secondChild = errorMessage.childNodes[1];
    expect(secondChild.nodeValue).toEqual(ERROR_MESSAGE_TEXT);
  });

  it('should display the appropriate markup in the error message', async () => {
    const ERROR_MESSAGE_ID = 'markup';
    const INNER_DIV_ID = 'inner-div';
    const INNER_DIV_TEXT = 'Inner div text';
    const ERROR_MESSAGE_MARKUP = <div data-testid={INNER_DIV_ID}>
      {INNER_DIV_TEXT}
    </div>;
    const { container } = render(
      <ErrorMessage data-testid={ERROR_MESSAGE_ID}>{ERROR_MESSAGE_MARKUP}</ErrorMessage>
    );
    const errorMessage = checkSetup(container, ERROR_MESSAGE_ID);
    const innerDiv = getByTestId(errorMessage, INNER_DIV_ID);
    expect(innerDiv.innerHTML).toEqual(INNER_DIV_TEXT);
  });

});
