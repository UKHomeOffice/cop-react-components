import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import Tag, { DEFAULT_CLASS } from './Tag';

describe('Tag', () => {

  const checkSetup = (container, testId) => {
    const tag = getByTestId(container, testId);
    expect(tag.classList).toContain(DEFAULT_CLASS);
    return tag;
  };

  it('should display the appropriate text as children', async () => {
    const TAG_ID = 'tag';
    const TEXT = 'Hello Inset World';
    const { container } = render(
      <Tag data-testid={TAG_ID}>{TEXT}</Tag>
    );
    const tag = checkSetup(container, TAG_ID);
    expect(tag.innerHTML).toEqual(TEXT);
  });

  it('should override any children with the text attribute', async () => {
    const TAG_ID = 'text';
    const CHILDREN = 'Hello Tag World';
    const TEXT = 'This should show instead';
    const { container } = render(
      <Tag data-testid={TAG_ID} text={TEXT}>{CHILDREN}</Tag>
    );
    const tag = checkSetup(container, TAG_ID);
    expect(tag.innerHTML).toEqual(TEXT);
  });

  it('should display the appropriate markup', async () => {
    const TAG_ID = 'markup';
    const INNER_DIV_ID = 'inner-div';
    const INNER_DIV_TEXT = 'Inner div text';
    const INNER_MARKUP = <div data-testid={INNER_DIV_ID}>
      {INNER_DIV_TEXT}
    </div>;
    const { container } = render(
      <Tag data-testid={TAG_ID}>{INNER_MARKUP}</Tag>
    );
    const tag = checkSetup(container, TAG_ID);
    const innerDiv = getByTestId(tag, INNER_DIV_ID);
    expect(innerDiv.innerHTML).toEqual(INNER_DIV_TEXT);
  });

  it('should correctly pick up the classModifiers', async () => {
    const TAG_ID = 'modifiers';
    const CHILDREN = 'Modifiers';
    const CLASS_MODIFIERS = 'red';
    const { container } = render(
      <Tag data-testid={TAG_ID} classModifiers={CLASS_MODIFIERS}>{CHILDREN}</Tag>
    );
    const tag = checkSetup(container, TAG_ID);
    expect(tag.innerHTML).toEqual(CHILDREN);
    expect(tag.classList).toContain(`${DEFAULT_CLASS}--${CLASS_MODIFIERS}`);
  });

});
