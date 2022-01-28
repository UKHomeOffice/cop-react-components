// Global imports
import PropTypes from 'prop-types';

// Local imports
import Hint, { DEFAULT_CLASS as DEFAULT_HINT_CLASS } from '../Hint/Hint';
import { DEFAULT_CLASS as DEFAULT_LABEL_CLASS } from '../Label/Label';
import { classBuilder } from '../utils/Utils';
import './Checkboxes.scss';

export const DEFAULT_CLASS = 'govuk-checkboxes';
const Checkbox = ({
  id,
  name,
  option,
  selected,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);

  return (
    <div className={classes('item')} {...attrs}>
      <input
        className={classes('input')}
        id={id}
        name={name}
        type='checkbox'
        value={option.value}
      />
      <label
        className={`${DEFAULT_LABEL_CLASS} ${classes('label')}`}
        htmlFor={id}
        disabled={option.disabled}
      >
        {option.label}
      </label>

      {option.hint && (
        <Hint
          id={`${id}-hint`}
          className={`${DEFAULT_HINT_CLASS} ${classes('hint')}`}
        >
          {option.hint}
        </Hint>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  option: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      hint: PropTypes.string,
      disabled: PropTypes.bool,
    }),
    PropTypes.string,
  ]).isRequired,
  selected: PropTypes.bool,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  selected: false,
  classBlock: DEFAULT_CLASS,
};

export default Checkbox;
