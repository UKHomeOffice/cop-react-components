// Global imports
import { getByTestId, render } from '@testing-library/react';
import React from 'react';

// Local imports
import AccordionItem, { DEFAULT_CLASS } from './AccordionItem';

describe('AccordionItem', () => {
  const checkSetup = (container, testId) => {
    const accordionItem = getByTestId(container, testId);
    expect(accordionItem.classList).toContain(`${DEFAULT_CLASS}__section`);
    const sectionHeader = accordionItem.childNodes[0];
    expect(sectionHeader.tagName).toEqual('DIV');
    expect(sectionHeader.classList).toContain(
      `${DEFAULT_CLASS}__section-header`
    );
    const sectionHeading = sectionHeader.childNodes[0];
    expect(sectionHeading.tagName).toEqual('H2');
    expect(sectionHeading.classList).toContain(
      `${DEFAULT_CLASS}__section-heading`
    );
    const sectionButton = sectionHeading.childNodes[0];
    expect(sectionButton.tagName).toEqual('SPAN');
    expect(sectionButton.classList).toContain(
      `${DEFAULT_CLASS}__section-button`
    );
    const sectionSummary = sectionHeader.childNodes[1];
    expect(sectionSummary.tagName).toEqual('DIV');
    expect(sectionSummary.classList).toContain(
      `${DEFAULT_CLASS}__section-summary`
    );
    const sectionContent = accordionItem.childNodes[1];
    expect(sectionContent.tagName).toEqual('DIV');
    expect(sectionContent.classList).toContain(
      `${DEFAULT_CLASS}__section-content`
    );

    return {
      accordionItem,
      sectionHeader,
      sectionHeading,
      sectionButton,
      sectionSummary,
      sectionContent
    };
  };

  const checkSetupNoSummary = (container, testId) => {
    const accordionItem = getByTestId(container, testId);
    expect(accordionItem.classList).toContain(`${DEFAULT_CLASS}__section`);
    const sectionHeader = accordionItem.childNodes[0];
    expect(sectionHeader.tagName).toEqual('DIV');
    expect(sectionHeader.classList).toContain(
      `${DEFAULT_CLASS}__section-header`
    );
    const sectionHeading = sectionHeader.childNodes[0];
    expect(sectionHeading.tagName).toEqual('H2');
    expect(sectionHeading.classList).toContain(
      `${DEFAULT_CLASS}__section-heading`
    );
    const sectionButton = sectionHeading.childNodes[0];
    expect(sectionButton.tagName).toEqual('SPAN');
    expect(sectionButton.classList).toContain(
      `${DEFAULT_CLASS}__section-button`
    );

    const sectionContent = accordionItem.childNodes[1];
    expect(sectionContent.tagName).toEqual('DIV');
    expect(sectionContent.classList).toContain(
      `${DEFAULT_CLASS}__section-content`
    );

    return {
      accordionItem,
      sectionHeader,
      sectionHeading,
      sectionButton,
      sectionContent
    };
  };

  const checkSetupExpanded = (container, testId) => {
    const accordionItem = getByTestId(container, testId);
    expect(accordionItem.classList).toContain(
      `${DEFAULT_CLASS}__section--expanded`
    );
    const sectionHeader = accordionItem.childNodes[0];
    expect(sectionHeader.tagName).toEqual('DIV');
    expect(sectionHeader.classList).toContain(
      `${DEFAULT_CLASS}__section-header`
    );
    const sectionHeading = sectionHeader.childNodes[0];
    expect(sectionHeading.tagName).toEqual('H2');
    expect(sectionHeading.classList).toContain(
      `${DEFAULT_CLASS}__section-heading`
    );
    const sectionButton = sectionHeading.childNodes[0];
    expect(sectionButton.tagName).toEqual('SPAN');
    expect(sectionButton.classList).toContain(
      `${DEFAULT_CLASS}__section-button`
    );
    const sectionSummary = sectionHeader.childNodes[1];
    expect(sectionSummary.tagName).toEqual('DIV');
    expect(sectionSummary.classList).toContain(
      `${DEFAULT_CLASS}__section-summary`
    );
    const sectionContent = accordionItem.childNodes[1];
    expect(sectionContent.tagName).toEqual('DIV');
    expect(sectionContent.classList).toContain(
      `${DEFAULT_CLASS}__section-content`
    );

    return {
      accordionItem,
      sectionHeader,
      sectionHeading,
      sectionButton,
      sectionSummary,
      sectionContent
    };
  };

  it('should display the appropriate text in the accordion', async () => {
    const ACCORDIONITEM_ID = 'Item';
    const ACCORDIONITEM_HEADING = 'Hello world!';
    const ACCORDIONITEM_SUMMARY = `Don't panic!`;
    const ACCORDIONITEM_CONTENT = `Content!`;
    const { container } = render(
      <AccordionItem
        data-testid={ACCORDIONITEM_ID}
        heading={ACCORDIONITEM_HEADING}
        summary={ACCORDIONITEM_SUMMARY}
      >
        {ACCORDIONITEM_CONTENT}
      </AccordionItem>
    );
    const { sectionButton, sectionSummary, sectionContent } = checkSetup(
      container,
      ACCORDIONITEM_ID
    );
    expect(sectionButton.innerHTML).toEqual(ACCORDIONITEM_HEADING);
    expect(sectionSummary.innerHTML).toEqual(ACCORDIONITEM_SUMMARY);
    expect(sectionContent.innerHTML).toEqual(ACCORDIONITEM_CONTENT);
  });

  it('should not show a summary if no summary exists', async () => {
    const ACCORDIONITEM_ID = 'Item';
    const ACCORDIONITEM_HEADING = 'Hello world!';
    const ACCORDIONITEM_CONTENT = `Content!`;
    const { container } = render(
      <AccordionItem
        data-testid={ACCORDIONITEM_ID}
        heading={ACCORDIONITEM_HEADING}
      >
        {ACCORDIONITEM_CONTENT}
      </AccordionItem>
    );
    const { sectionButton, sectionContent } = checkSetupNoSummary(
      container,
      ACCORDIONITEM_ID
    );
    expect(sectionButton.innerHTML).toEqual(ACCORDIONITEM_HEADING);
    expect(sectionContent.innerHTML).toEqual(ACCORDIONITEM_CONTENT);
  });

  it('should display the accordion open if expanded is true', async () => {
    const ACCORDIONITEM_ID = 'Item';
    const ACCORDIONITEM_HEADING = 'Hello world!';
    const ACCORDIONITEM_SUMMARY = `Don't panic!`;
    const ACCORDIONITEM_CONTENT = `Content!`;
    const ACCORDIONITEM_ISEXPANDED = true;
    const { container } = render(
      <AccordionItem
        data-testid={ACCORDIONITEM_ID}
        heading={ACCORDIONITEM_HEADING}
        summary={ACCORDIONITEM_SUMMARY}
        expanded={ACCORDIONITEM_ISEXPANDED}
      >
        {ACCORDIONITEM_CONTENT}
      </AccordionItem>
    );
    const { sectionButton, sectionSummary, sectionContent } =
      checkSetupExpanded(container, ACCORDIONITEM_ID);
    expect(sectionButton.innerHTML).toEqual(ACCORDIONITEM_HEADING);
    expect(sectionSummary.innerHTML).toEqual(ACCORDIONITEM_SUMMARY);
    expect(sectionContent.innerHTML).toEqual(ACCORDIONITEM_CONTENT);
  });
});
