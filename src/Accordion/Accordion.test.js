import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Accordion, { DEFAULT_CLASS } from './Accordion';

describe('Accordion', () => {

  const checkSetup = (container, testId) => {
    const accordion = getByTestId(container, testId);
    expect(accordion.classList).toContain(DEFAULT_CLASS);
    return { accordion };
  };

  it('should appropriately support classModifiers', async () => {
    const ACCORDION_ID = 'id';
    const CLASS_MODIFIERS = ['success', 'test'];
    const { container } = render(
      <Accordion data-testid={ACCORDION_ID} classModifiers={CLASS_MODIFIERS}></Accordion>
    );
    const { accordion } = checkSetup(container, ACCORDION_ID);
    CLASS_MODIFIERS.forEach(cm => {
      expect(accordion.classList).toContain(`${DEFAULT_CLASS}--${cm}`);
    });
  });
});
