import React, { useEffect, useRef } from 'react';
import './Accordion.scss';
import { classBuilder } from '../utils/Utils';
import PropTypes from 'prop-types';

export const DEFAULT_CLASS = 'govuk-accordion';

const Accordion = ({ children, id, classBlock, classModifiers, className, ...attrs }) => {
  const accordionRef = useRef();
  const classes = classBuilder(classBlock, classModifiers, className);

  useEffect(() => {
    (async () => {
      if (typeof document !== 'undefined') {
        const { default: AccordionJS } = await import(
          'govuk-frontend/govuk/components/accordion/accordion'
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
      className={`${classes()} ${className || ''}`}
      data-module={classes()}
      ref={accordionRef}
    >
      {children}
    </div>
  );
}

Accordion.propTypes = {
  className: PropTypes.string,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

Accordion.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default Accordion;
