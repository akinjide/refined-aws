import pB from './pin-button';
import hS from './hide-support';
import hR from './hide-region';
import hRG from './hide-resource-groups';
import hAL from './hide-amazon-logo';
import sSOB from './show-sign-out-button';
import sDB from './show-documentation-button';
import fB from './feedback-button';
import lSB from './language-selector-button';

import hF from './hide-footer';
import kS from './keyboard-shortcuts';
import uSF from './use-system-font';

import dBN from './duplicate-breadcrumb-navigation';

import sCC from './support-center-cases';

export const features = {
  /* NAVIGATION BAR */
  pinButton: {
    id: 'feature-pin-button',
    category: 'navigation',
    label: 'Move "Pin" button and "Quick Navigation"',
    fn: pB,
    enabledByDefault: true,
    runOnInit: true,
    locked: true
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
  hideResourceGroups: {
    id: 'feature-hide-resource-groups',
    category: 'navigation',
    label: 'Hide "Resource Groups" selection',
    fn: hRG,
    enabledByDefault: false,
    runOnInit: false
  },
  showSignOutButton: {
    id: 'feature-show-sign-out-button',
    category: 'navigation',
    label: 'Show "Sign Out" button',
    fn: sSOB,
    enabledByDefault: false,
    runOnInit: false
  },
  showDocumentationButton: {
    id: 'feature-show-documentation-button',
    category: 'navigation',
    label: 'Show "Documentation" button',
    fn: sDB,
    enabledByDefault: false,
    runOnInit: false
  },
  moveFeedbackButton: {
    id: 'feature-move-feedback-button',
    category: 'navigation',
    label: 'Move "Feedback" button',
    fn: fB,
    enabledByDefault: false,
    runOnInit: false
  },
  moveLanguageSelectorButton: {
    id: 'feature-move-language-selector-button',
    category: 'navigation',
    label: 'Move "Language Selector" button',
    fn: lSB,
    enabledByDefault: false,
    runOnInit: false
  },

  /* GENERAL */
  hideFooter: {
    id: 'feature-hide-footer',
    category: 'general',
    label: 'Hide console "Footer"',
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
  useSystemFont: {
    id: 'feature-use-system-font',
    category: 'general',
    label: 'Use the "System Font"',
    fn: uSF,
    enabledByDefault: true,
    runOnInit: true,
    locked: false
  },

  expandSupportCenterCases: {
    id: 'feature-expand-support-center-cases',
    category: 'support',
    label: 'Expand "Recent Support Cases" layout',
    fn: sCC,
    enabledByDefault: true,
    runOnInit: true,
    locked: false
  },

  /* SYSTEMS MANAGER */
  duplicateBreadCrumbNavigation: {
    id: 'feature-duplicate-breadcrumb-navigation',
    category: 'systems manager',
    label: 'Show "Breadcrumb Navigation" on table bottom within Shared Resources section',
    fn: dBN,
    enabledByDefault: false,
    runOnInit: false,
    locked: true
  },

  /* ADVANCED */
  showExtensionLogs: {
    id: 'logging',
    category: 'debugging',
    label: 'Show "Extension Logs" in console',
    enabledByDefault: false,
    runOnInit: false
  }
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
