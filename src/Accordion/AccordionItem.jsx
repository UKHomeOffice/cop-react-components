// Global imports
import PropTypes from 'prop-types';
import React from 'react';

// Local imports
import { classBuilder } from '../utils/Utils';

// Styles
import './Accordion.scss';

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
  const classes = classBuilder(classBlock, classModifiers, className);
  const sectionModifiers = expanded ? ['expanded'] : [];

  return (
    <div {...attrs} id={id} className={classes('section', sectionModifiers)}>
      <div className={classes('section-header')}>
        <h2 className={classes('section-heading')}>
          <span className={classes('section-button')}>{heading}</span>
        </h2>
        {summary && (
          <div className={`${classes('section-summary')} govuk-body`}>
            {summary}
          </div>
        )}
      </div>
      <div className={classes('section-content')}>{children}</div>
    </div>
  );
};

AccordionItem.propTypes = {
  id: PropTypes.string,
  summary: PropTypes.string,
  expanded: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  className: PropTypes.string
};

AccordionItem.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default AccordionItem;
