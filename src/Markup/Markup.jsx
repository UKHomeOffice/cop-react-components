// Global imports
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React from 'react';
import './Markup.scss';

/**
 * The following list has been taken from w3.org:
 * https://www.w3.org/TR/2011/WD-html-markup-20110113/syntax.html#void-elements
 */
export const VOID_ELEMENTS = [
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
  'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];
export const DEFAULT_TAG_NAME = 'p';
const Markup = ({ children, tagName, className, content, ...attrs }) => {
  const Tag = `${tagName}`;
  if (VOID_ELEMENTS.includes(Tag)) {
    return <Tag {...attrs} className={className} />;
  }
  return <Tag {...attrs} className={className}>
    {content && parse(content)}
    {!content && children}
  </Tag>;
};

Markup.propTypes = {
  tagName: PropTypes.string.isRequired,
  content: PropTypes.string,
  className: PropTypes.string
};

Markup.defaultProps = {
  tagName: DEFAULT_TAG_NAME
};

export default Markup;
