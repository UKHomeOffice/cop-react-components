// Global imports
import React from 'react';
import { getByTestId, render } from '@testing-library/react';

// Local imports
import Markup, { DEFAULT_TAG_NAME } from './Markup';

describe('Markup', () => {

  it('should display the appropriate text', async () => {
    const MARKUP_ID = 'markupId';
    const TEXT = 'Hello World';
    const { container } = render(
      <Markup data-testid={MARKUP_ID}>{TEXT}</Markup>
    );
    const markup = getByTestId(container, MARKUP_ID);
    expect(markup.innerHTML).toEqual(TEXT);
    expect(markup.tagName).toEqual(DEFAULT_TAG_NAME.toUpperCase());
  });

  it('should use the appropriate tagName', async () => {
    const MARKUP_ID = 'markupId';
    const TEXT = 'Hello World';
    const TAG_NAME = 'div';
    const { container } = render(
      <Markup data-testid={MARKUP_ID} tagName={TAG_NAME}>{TEXT}</Markup>
    );
    const markup = getByTestId(container, MARKUP_ID);
    expect(markup.innerHTML).toEqual(TEXT);
    expect(markup.tagName).toEqual(TAG_NAME.toUpperCase());
  });

  it('should use the appropriate className', async () => {
    const MARKUP_ID = 'markupId';
    const TEXT = 'Hello World';
    const TAG_NAME = 'h1';
    const CLASS_NAME = 'govuk-heading-l';
    const { container } = render(
      <Markup data-testid={MARKUP_ID} tagName={TAG_NAME} className={CLASS_NAME}>{TEXT}</Markup>
    );
    const markup = getByTestId(container, MARKUP_ID);
    expect(markup.innerHTML).toEqual(TEXT);
    expect(markup.tagName).toEqual(TAG_NAME.toUpperCase());
    expect(markup.classList).toContain(CLASS_NAME);
  });

  it('should accept internal markup as well as text and render it appropriately', async () => {
    const MARKUP_ID = 'markupId';
    const TAG_NAME = 'h1';
    const CLASS_NAME = 'govuk-heading-l';
    const INNER_TEXT = 'Hello world!';
    const INNER_TAG_NAME = 'span';
    const { container } = render(
      <Markup data-testid={MARKUP_ID} tagName={TAG_NAME} className={CLASS_NAME}>
        <Markup tagName={INNER_TAG_NAME}>{INNER_TEXT}</Markup>
      </Markup>
    );
    const markup = getByTestId(container, MARKUP_ID);
    expect(markup.tagName).toEqual(TAG_NAME.toUpperCase());
    expect(markup.classList).toContain(CLASS_NAME);
    expect(markup.childNodes.length).toEqual(1);
    const innerSpan = markup.childNodes[0];
    expect(innerSpan.innerHTML).toEqual(INNER_TEXT);
    expect(innerSpan.tagName).toEqual(INNER_TAG_NAME.toUpperCase());
  });

});
