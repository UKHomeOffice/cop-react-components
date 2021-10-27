import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Details, { DEFAULT_CLASS } from './Details';

describe('Details', () => {

  const checkSetup = (container, testId) => {
    const details = getByTestId(container, testId);
    expect(details.classList).toContain(DEFAULT_CLASS);
    const firstChild = details.childNodes[0];
    expect(firstChild.tagName).toEqual('SUMMARY');
    expect(firstChild.classList).toContain(`${DEFAULT_CLASS}__summary`);
    const secondChild = details.childNodes[1];
    expect(secondChild.tagName).toEqual('DIV');
    expect(secondChild.classList).toContain(`${DEFAULT_CLASS}__text`);
    return { details, firstChild, secondChild };
  };

  it('should display the appropriate summary text in the details', async () => {
    const DETAILS_ID = 'details';
    const DETAILS_SUMMARY = 'Hello world!'
    const DETAILS_TEXT = `Here's some important information for you`;
    const { container } = render(
      <Details data-testid={DETAILS_ID} summary={DETAILS_SUMMARY}>{DETAILS_TEXT}</Details>
    );
    const { firstChild, secondChild } = checkSetup(container, DETAILS_ID);
    expect(firstChild.innerHTML).toEqual(DETAILS_SUMMARY);
    expect(secondChild.innerHTML).toEqual(DETAILS_TEXT);
  });

  it('should appropriately support classModifiers', async () => {
    const DETAILS_ID = 'modifiers';
    const DETAILS_SUMMARY = 'Breaking news';
    const DETAILS_TEXT = 'Something useful and interesting';
    const CLASS_MODIFIERS = ['warning', 'test'];
    const { container } = render(
      <Details data-testid={DETAILS_ID} summary={DETAILS_SUMMARY} classModifiers={CLASS_MODIFIERS}>{DETAILS_TEXT}</Details>
    );
    const { details } = checkSetup(container, DETAILS_ID);
    CLASS_MODIFIERS.forEach(cm => {
      expect(details.classList).toContain(`${DEFAULT_CLASS}--${cm}`);
    });
  });

});
