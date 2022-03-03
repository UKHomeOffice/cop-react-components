import React, { useEffect, useRef } from "react";
import "./Accordion.scss";
import { classBuilder } from "../utils/Utils";
import PropTypes from "prop-types";

export const DEFAULT_CLASS = "govuk-accordion";

function Accordion(props) {
  const accordionRef = useRef();
  const { children, className, id, ...attrs } = props;

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
    <div
      {...attrs}
      id={id}
      className={`govuk-accordion ${className || ""}`}
      data-module='govuk-accordion'
      ref={accordionRef}
    >
      {children}
    </div>
  );
}

Accordion.propTypes = {
  className: PropTypes.string,
};

Accordion.defaultProps = {};

export default Accordion;
