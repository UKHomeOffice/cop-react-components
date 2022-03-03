import React, { useEffect, useRef } from 'react';
import './Accordion.scss';
import { classBuilder } from '../utils/Utils';
import PropTypes from 'prop-types';

export const DEFAULT_CLASS = 'govuk-accordion';

const AccordionItem = ({
  children,
  classBlock,
  classModifiers,
  className,
  heading,
  id,
  summary,
  expanded,
  ...attrs
}) => {
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
    id = {id}
    className={`govuk-accordion__section ${
      expanded ? classes('section--expanded') : ''
    }`}
  >
      <div className={classes('section-header')}>
        <h2 className={classes('section-heading')}>
            <span className={classes('section-button')}>{heading}</span>
        </h2>
        {summary ? (
          <div className={`${classes('section-summary')}  govuk-body`}>
            {summary}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={classes('section-content')}>{children}</div>
    </div>

  );
};

AccordionItem.propTypes = {
  heading: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string,
};

AccordionItem.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default AccordionItem;
