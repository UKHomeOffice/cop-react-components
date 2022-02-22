// Global imports
import { create } from '@storybook/theming';

const GovUKTheme = create({
  base: 'light',

  colorPrimary: '#0b0c0c',
  colorSecondary: '#005ea5',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: '#b1b4b6',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Roboto", arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#0b0c0c',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#005ea5',
  barSelectedColor: '#0b0c0c',
  // barBg: 'white',

  brandTitle: 'COP React Form Renderer',
  brandUrl: 'https://design-system.service.gov.uk/',
  brandImage: './images/govuk-mask-icon.svg',
});

export default GovUKTheme;
