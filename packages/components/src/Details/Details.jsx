import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './Details.scss';

export const DEFAULT_CLASS = 'govuk-details';
const Details = ({ children, summary, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return <details {...attrs} className={classes()}>
    <summary className={classes('summary')}>{summary}</summary>
    <div className={classes('text')}>
      {children}
    </div>
  </details>;
};

Details.propTypes = {
  summary: PropTypes.string.isRequired,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

Details.defaultProps = {
  classBlock: DEFAULT_CLASS
};

export default Details;
