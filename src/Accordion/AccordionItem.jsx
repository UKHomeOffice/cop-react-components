import React, { useEffect, useRef } from "react";
import "./Accordion.scss";
import { classBuilder } from "../utils/Utils";
import PropTypes from "prop-types";

const AccordionItem = ({
  children,
  headingLevel,
  heading,
  summary,
  content,
  expanded,
  ...attrs
}) => {
  const accordionRef = useRef();

  useEffect(() => {
    (async () => {
      if (typeof document !== "undefined") {
        const { default: AccordionJS } = await import(
          "govuk-frontend/govuk/components/accordion/accordion"
        );

        if (accordionRef.current) {
          new AccordionJS(accordionRef.current).init();
        }
      }
    })();
  }, [accordionRef]);

  return (
    <>
      <div
        {...attrs}
        className={`govuk-accordion__section ${
          expanded ? "govuk-accordion__section--expanded" : ""
        }`}
      >
        <div className='govuk-accordion__section-header'>
          <h2 className='govuk-accordion__section-heading'>
            <span className='govuk-accordion__section-button'>{heading}</span>
          </h2>
          {summary ? (
            <div className='govuk-accordion__section-summary govuk-body'>
              {summary}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className='govuk-accordion__section-content'>{children}</div>
      </div>
    </>
  );
};

AccordionItem.propTypes = {
  heading: PropTypes.string.isRequired,

  className: PropTypes.string,
};

export default AccordionItem;
