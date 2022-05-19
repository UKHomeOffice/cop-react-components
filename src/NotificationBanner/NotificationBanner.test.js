import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import NotificationBanner, { DEFAULT_CLASS } from './NotificationBanner';

describe('NotificationBanner', () => {

  const checkSetup = (container, testId) => {
    const banner = getByTestId(container, testId);
    expect(banner.classList).toContain(DEFAULT_CLASS);
    const [ header, content ] = banner.childNodes;
    expect(header.tagName).toEqual('DIV');
    expect(header.classList).toContain(`${DEFAULT_CLASS}__header`);
    expect(content.tagName).toEqual('DIV');
    expect(content.classList).toContain(`${DEFAULT_CLASS}__content`);
    const title = header.firstChild;
    expect(title.tagName).toEqual('H2');
    expect(title.classList).toContain(`${DEFAULT_CLASS}__title`);
    return { banner, header, title, content };
  };

  it('should display the appropriate text in the banner without JUST a body', async () => {
    const BANNER_ID = 'banner';
    const BANNER_TITLE = 'Hello world!'
    const BANNER_TEXT = `Don't panic!`;
    const { container } = render(
      <NotificationBanner data-testid={BANNER_ID} title={BANNER_TITLE}>{BANNER_TEXT}</NotificationBanner>
    );
    const { title, content } = checkSetup(container, BANNER_ID);
    expect(title.textContent).toContain(BANNER_TITLE);
    expect(content.childNodes.length).toEqual(1); // no heading
    const body = content.firstChild;
    expect(body.tagName).toEqual('P');
    expect(body.classList).toContain('govuk-body');
    expect(body.textContent).toContain(BANNER_TEXT);
  });

  it('should display the appropriate text in the banner with JUST a heading', async () => {
    const BANNER_ID = 'banner';
    const BANNER_TITLE = 'Hello world!'
    const BANNER_HEADING = `It's about to get real...`;
    const { container } = render(
      <NotificationBanner data-testid={BANNER_ID} title={BANNER_TITLE} heading={BANNER_HEADING} />
    );
    const { title, content } = checkSetup(container, BANNER_ID);
    expect(title.textContent).toContain(BANNER_TITLE);
    expect(content.childNodes.length).toEqual(1); // no body
    const heading = content.firstChild;
    expect(heading.tagName).toEqual('P');
    expect(heading.classList).toContain(`${DEFAULT_CLASS}__heading`);
    expect(heading.textContent).toContain(BANNER_HEADING);
  });

  it('should display the appropriate text in the banner with a heading and a body', async () => {
    const BANNER_ID = 'banner';
    const BANNER_TITLE = 'Hello world!'
    const BANNER_HEADING = `It's about to get real...`;
    const BANNER_TEXT = `Don't panic!`;
    const { container } = render(
      <NotificationBanner data-testid={BANNER_ID} title={BANNER_TITLE} heading={BANNER_HEADING}>
        {BANNER_TEXT}
      </NotificationBanner>
    );
    const { title, content } = checkSetup(container, BANNER_ID);
    expect(title.textContent).toContain(BANNER_TITLE);
    expect(content.childNodes.length).toEqual(2); // includes heading
    const [ heading, body ] = content.childNodes;
    expect(heading.tagName).toEqual('H3');
    expect(heading.classList).toContain(`${DEFAULT_CLASS}__heading`);
    expect(heading.textContent).toContain(BANNER_HEADING);
    expect(body.tagName).toEqual('P');
    expect(body.classList).toContain('govuk-body');
    expect(body.textContent).toContain(BANNER_TEXT);
  });

  it('should appropriately support classModifiers', async () => {
    const BANNER_ID = 'modifiers';
    const BANNER_TITLE = 'It worked!'
    const BANNER_TEXT = 'Great news, everyone.';
    const CLASS_MODIFIERS = ['success', 'test'];
    const { container } = render(
      <NotificationBanner data-testid={BANNER_ID} title={BANNER_TITLE} classModifiers={CLASS_MODIFIERS}>{BANNER_TEXT}</NotificationBanner>
    );
    const { banner } = checkSetup(container, BANNER_ID);
    CLASS_MODIFIERS.forEach(cm => {
      expect(banner.classList).toContain(`${DEFAULT_CLASS}--${cm}`);
    });
  });

});
