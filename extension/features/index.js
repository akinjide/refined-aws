import config from '../config';
import pB from './pin-button';
import hS from './hide-support';
import hR from './hide-region';
import hAL from './hide-amazon-logo';
import sSOB from './show-sign-out-button';
import hF from './hide-footer';
import kS from './shortcuts';
import uSF from './use-system-font';
import dH from './draggable-history';

export const features = {
  /* NAVIGATION BAR */
  pinButton: {
    id: 'feature-pin-button',
    category: 'navigation',
    label: 'Show "Quick Favorites Navigation"',
    fn: pB,
    enabledByDefault: true,
    runOnInit: false,
    locked: false
  },
  hideAmazonConsoleLogo: {
    id: 'feature-hide-amazon-console-logo',
    category: 'navigation',
    label: 'Hide "AWS Smile" logo',
    fn: hAL,
    enabledByDefault: false,
    runOnInit: false,
    locked: false
  },
  hideSupport: {
    id: 'feature-hide-support',
    category: 'navigation',
    label: 'Hide "Support" selection',
    fn: hS,
    enabledByDefault: false,
    runOnInit: false
  },
  hideRegion: {
    id: 'feature-hide-region',
    category: 'navigation',
    label: 'Hide "Region" selection',
    fn: hR,
    enabledByDefault: false,
    runOnInit: false
  },
  showSignOutButton: {
    id: 'feature-show-sign-out-button',
    category: 'navigation',
    label: 'Show "Sign Out" button',
    fn: sSOB,
    enabledByDefault: true,
    runOnInit: false
  },

  /* GENERAL */
  useSystemFont: {
    id: 'feature-use-system-font',
    category: 'general',
    label: 'Use the "System Font"',
    fn: uSF,
    enabledByDefault: true,
    runOnInit: true,
    locked: false
  },
  hideFooter: {
    id: 'feature-hide-footer',
    category: 'general',
    label: 'Hide "Footer"',
    fn: hF,
    enabledByDefault: false,
    runOnInit: false
  },
  keyboardShortcuts: {
    id: 'feature-keyboard-shortcuts',
    category: 'general',
    label: 'Enable "Keyboard Shortcuts"',
    fn: kS,
    enabledByDefault: false,
    runOnInit: false
  },
  enableDraggableHistory: {
    id: 'feature-enable-draggable-history',
    category: 'general',
    label: 'Enable "Draggable History"',
    fn: dH,
    enabledByDefault: false,
    runOnInit: false,
    locked: true
  },

  /* ADVANCED */
  showExtensionLogs: {
    id: 'logging',
    category: 'debugging',
    label: 'Show "Extension Logs" in console',
    enabledByDefault: config.devMode,
  },
};

export const values = Object.values(features);
export const keys = Object.keys(features);

export const capitalizeFeaturesCategory = values
  .map(feature => ({
    ...feature,
    category: feature.category
      .toLowerCase()
      .replace(/(^| )(\w)/g, char => char.toUpperCase()),
  }));

export const runOnInitFeatures = keys
  .reduce((arr, key) => [...arr, features[key]], [])
  .filter(({runOnInit}) => runOnInit && typeof runOnInit === 'boolean');

export const defaultFeatures = values
  .reduce((features, {enabledByDefault, id}) => ({
    ...features,
    [id]: typeof enabledByDefault === 'boolean' ? enabledByDefault : true
  }), {});

export const groupFeatures = groupBy => Object.entries(
  capitalizeFeaturesCategory
    .sort((a, b) => b - a)
    .reduce((features, feature) => {
      return {
        ...features,
        [feature[groupBy]]: [...(features[feature[groupBy]] || []), feature],
      };
    }, {})
);
