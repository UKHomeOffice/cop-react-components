// Global imports
import React from 'react';
import PropTypes from 'prop-types';

export const DEFAULT_TAG_NAME = 'p';
const Markup = ({ children, tagName, className, ...attrs }) => {
  const Tag = `${tagName}`;
  return <Tag {...attrs} className={className}>
    {children}
  </Tag>;
};

Markup.propTypes = {
  tagName: PropTypes.string.isRequired,
  className: PropTypes.string
};

Markup.defaultProps = {
  tagName: DEFAULT_TAG_NAME
};

export default Markup;
