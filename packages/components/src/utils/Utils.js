const INTERPOLATE_REGEX = /\${[^{]+}/g;

const getObjPath = (path, obj, fallback = '') => {
  return path.split('.').reduce((res, key) => res[key] || fallback, obj);
};

const concatClasses = (...classes) => {
  return classes.flat(Infinity).filter(cs => !!cs).join(' ') || undefined;
};

/**
 * Create an array from the src parameter.
 * @param {*} src 
 * @returns src, if it is already an array; otherwise, an array containing src.
 */
export const toArray = (src) => {
  return Array.isArray(src) ? src : src && [src];
};

/**
 * Interpolate a string (potentially HTML) with variables.
 * @param {*} template The template string
 * @param {*} variables The values to be used in the interpolation
 * @param {*} fallback (defaults to '')
 * @returns A fully interpolated string.
 * @example
 *  interpolateString('<span>${item.label}</span>', { item: { id: '1', label: 'Item 1' } });
 *  // <span>Item 1</span>
 * @example
 *  interpolateString('<span>${forename} ${surname}</span>', { forename: 'William' }, 'Fallback-Smith');
 *  // <span>William Fallback-Smith</span>
 */
export const interpolateString = (template, variables, fallback = '') => {
  const obj = variables ?? {};
  if (typeof template === 'string') {
    return template.replace(INTERPOLATE_REGEX, (match) => {
      const path = match.slice(2, -1).trim();
      return getObjPath(path, obj, fallback);
    });
  }
  return '';
};

/**
 * Should be used for easy handling of BEM classes.
 * @param {*} block
 * @param {*} blockModifiers 
 * @param {*} blockExtra 
 * @returns A function that will itself return a string representation of the classes to apply to an element.
 */
export const classBuilder = (block, blockModifiers, blockExtra) => {
  const bModifiers = toArray(blockModifiers);

  return (element, elementModifiers, elementExtra) => {
    const eModifiers = toArray(elementModifiers);
    if (element) {
      return concatClasses(`${block}__${element}`, eModifiers?.filter(e => !!e).map(modifier => `${block}__${element}--${modifier}`), elementExtra);
    }
    return concatClasses(`${block}`, bModifiers?.filter(b => !!b).map(modifier => `${block}--${modifier}`), blockExtra);
  };
};

const Utils = {
  classBuilder,
  interpolateString,
  toArray
};

export default Utils;
