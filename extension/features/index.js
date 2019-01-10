import { default as pB } from './pin-button';

export const features = {
  /* NAVIGATION BAR */
  pinButton: {
    id: 'feature-pin-button',
    category: 'navigation',
    label: 'Move "Pin" button',
    fn: pB,
    enabledByDefault: true,
    runOnInit: true
  }
};

export const values = Object.values(features);
export const keys = Object.keys(features);

export const runOnInitFeatures = keys
  .reduce((arr, key) => [...arr, features[key]], [])
  .filter(({runOnInit}) => runOnInit && typeof runOnInit === 'boolean');

export const defaultFeatures = values
  .filter(({ enabledByDefault }) => enabledByDefault && typeof enabledByDefault === 'boolean')
  .map(({ enabledByDefault, id }) => ({ [id]: enabledByDefault }));
