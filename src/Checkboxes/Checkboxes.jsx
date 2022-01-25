import PropTypes from "prop-types";

import Hint from "../Hint/Hint";
import "./Checkboxes.scss";
import Checkbox from "./Checkbox";
import { classBuilder } from "../utils/Utils";

export const DEFAULT_CLASS = "govuk-checkboxes";

const Checkboxes = ({
  id,
  fieldId,
  readonly,
  options,
  value,
  onChange,
  classBlock,
  classModifiers,
  className,
  hint,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);

  return (
    <div id={id} className={classes()} {...attrs}>
      {hint && (
        <Hint id={`${id}-hint`} className="govuk-hint">
          {hint}
        </Hint>
      )}
      {options &&
        options.map((option, index) => {
          const optionId = `${fieldId}-${index}`;
          const name = fieldId;
          const selected =
            typeof value === "object"
              ? option.value === value?.value
              : option.value === value;
          return (
            <Checkbox
              key={optionId}
              id={optionId}
              name={name}
              option={option}
              selected={selected}
              classBlock={classBlock}
              classModifiers={classModifiers}
              className={className}
            />
          );
        })}
    </div>
  );
};

Checkboxes.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        hint: PropTypes.string,
        disabled: PropTypes.bool,
      }),
      PropTypes.string,
    ])
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  className: PropTypes.string,
  hint: PropTypes.string,
};

Checkboxes.defaultProps = {
  classBlock: DEFAULT_CLASS,
};

export default Checkboxes;
