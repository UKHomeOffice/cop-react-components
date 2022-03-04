// Global imports
import accordion from 'govuk-frontend/govuk/components/accordion/accordion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

// Local imports
import { classBuilder } from '../utils/Utils';

// Styles
import './Accordion.scss';

export const DEFAULT_CLASS = 'govuk-accordion';
const Accordion = ({
  children,
  className,
  classBlock,
  classModifiers,
  id,
  ...attrs
}) => {
  const accordionRef = useRef();
  const classes = classBuilder(classBlock, classModifiers, className);

  useEffect(() => {
    if (accordionRef.current) {
      new accordion(accordionRef.current).init();
    }
  }, [accordionRef]);

  return (
    <div className="hods-accordion">
      <div
        {...attrs}
        id={id}
        className={classes()}
        data-module={'govuk-accordion'}
        ref={accordionRef}
      >
        {children}
      </div>
    </div>
  );
};

Accordion.propTypes = {
  className: PropTypes.string,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

Accordion.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default Accordion;
