import { interpolateString } from '../utils/Utils';

const getItemLabel = (property) => {
  return (item) => {
    return item && item[property] ? item[property] : '';
  }
};

const interpolateLabel = (format) => {
  return (item) => {
    return interpolateString(format, item).trim();
  }
};

const itemLabel = (structure) => {
  if (structure) {
    return structure.format ? interpolateLabel(structure.format) : getItemLabel(structure.label);
  }
  return (item) => item || '';
};

const isFunction = (fn) => {
  return typeof fn === 'function';
};

export const getTemplates = (templates, itemStructure) => {
  if (templates) {
    // If we only have one property, mirror it on the other one.
    if (isFunction(templates.inputValue)) {
      if (!isFunction(templates.suggestion)) {
        templates.suggestion = templates.inputValue;
      }
      return templates;
    } else if (isFunction(templates.suggestion)) {
      templates.inputValue = templates.suggestion;
      return templates;
    }
  }
  // We don't have a usable templates object so build a whole new one.
  const label = itemLabel(itemStructure);
  return {
    inputValue: label,
    suggestion: label
  };
};
