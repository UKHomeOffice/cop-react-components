import React from 'react';
import PropTypes from 'prop-types';
import { classBuilder } from '../utils/Utils';
import './NotificationBanner.scss';

export const DEFAULT_ID = 'govuk-notification-banner';
export const DEFAULT_CLASS = 'govuk-notification-banner';
const NotificationBanner = ({
  id,
  title,
  heading,
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder(classBlock, classModifiers, className);
  return (
    <div {...attrs} role="region" aria-labelledby={`${id}-title`} data-module={DEFAULT_CLASS} className={classes()}>
      <div className={classes('header')}>
        <h2 className={classes('title')} id={`${id}-title`}>
          {title}
        </h2>
      </div>
      <div className={classes('content')}>
        {!children && heading && (
          <p className={classes('heading')}>{heading}</p>
        )}
        {children && (
          <>
            {heading && <h3 className={classes('heading')}>{heading}</h3>}
            <p className="govuk-body">{children}</p>
          </>
        )}
      </div>
    </div>
  );
};

NotificationBanner.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  classBlock: PropTypes.string,
  classModifiers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

NotificationBanner.defaultProps = {
  id: DEFAULT_ID,
  classBlock: DEFAULT_CLASS
};

export default NotificationBanner;
