// Global imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Local imports
import Button from '../Button';
import Readonly from '../Readonly';
import { classBuilder, toArray } from '../utils/Utils';

// Styles
import './FileUpload.scss';

export const DEFAULT_CLASS = 'hods-file-upload';
const FileUpload = ({
  id,
  fieldId,
  disabled,
  error,
  readonly,
  value: _value,
  onChange,
  classBlock,
  classModifiers: _classModifiers,
  className,
  ...attrs
}) => {
  const [value, setValue] = useState({});
  const [thumb, setThumb] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (_value) {
      setValue(_value);
    } else {
      setValue(undefined);
    }
  }, [_value, setValue]);

  useEffect(() => {
    let newThumb = null;
    let newIcon = null;
    if (value) {
      const { url, file, type, extension } = value;
      if (type) {
        if (type.indexOf('image/') === 0) {
          if (url) {
            newThumb = url;
          } else if (file) {
            newThumb = URL.createObjectURL(file);
          }
        } else {
          newIcon = extension;
        }
      }
    }
    setThumb(newThumb);
    setIcon(newIcon);
  }, [value, setThumb, setIcon]);

  const err = error ? 'error' : undefined;
  const dis = disabled ? 'disabled' : undefined;
  const classModifiers = [...toArray(_classModifiers), err, dis];
  const classes = classBuilder(classBlock, classModifiers, className);

  const dispatchChange = (changeValue) => {
    if (typeof onChange === 'function') {
      onChange({ target: { name: fieldId, value: changeValue } }); 
    }
  };

  const onFileSelected = (e) => {
    const file = e.target.files[0];
    const extension = file.name.split('.').pop();
    const newValue = {
      name: file.name,
      extension,
      type: file.type,
      file,
      url: ''
    };
    setValue(newValue);
    dispatchChange(newValue);
  };

  const onRemoveFile = () => {
    setValue(undefined);
    dispatchChange(undefined);
  };

  if (readonly) {
    return (
      <Readonly id={id} classModifiers={classModifiers} className={className} {...attrs}>
        {value?.name && (
          <>
            {value.name}
            {thumb && <img className={classes('thumb')} src={thumb} alt={value.name} />}
            {icon && <div className={`${classes('icon')} document-icon-${icon}`}></div>}
          </>
        )}
      </Readonly>
    );
  }
  const idParts = id.split('.');
  idParts.pop();
  idParts.push(fieldId);
  const name = idParts.join('.');

  return (
    <div className={classes()} disabled={disabled}>
      <input
        {...attrs}
        value={''}
        onChange={onFileSelected}
        disabled={disabled}
        id={`${id}-select`}
        name={`${name}-select`}
        type="file"
        className={classes('select')}
      />
      <label htmlFor={`${name}-select`} className={classes('label')}>
        <span className={classes('label-button')}>Choose file</span>
        {value?.name ? (
          <span className={classes('label-filename')}>{value.name}</span>
        ) : 'No file chosen'
        }
      </label>
      {value?.name && (
        <>
          {thumb && <img className={classes('thumb')} src={thumb} alt={value.name} />}
          {icon && <div className={`${classes('icon')} document-icon-${icon}`}></div>}
          <Button
            id={`${id}-remove`}
            classModifiers="secondary"
            className={classes('remove')}
            onClick={() => onRemoveFile()}
          >
            Remove
          </Button>
        </>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  id: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  readonly: PropTypes.bool,
  value: PropTypes.shape({
    name: PropTypes.string,
    extension: PropTypes.string,
    type: PropTypes.string,
    file: PropTypes.any,
    url: PropTypes.string,
  }),
  onChange: PropTypes.func,
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

FileUpload.defaultProps = {
  classBlock: DEFAULT_CLASS,
  classModifiers: []
};

export default FileUpload;
