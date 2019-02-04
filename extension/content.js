import {runOnInitFeatures, features} from './features';
import {StoreSync} from './library/store-sync';
import {ready, observeElement, safeElementReady} from './library/dom';

const storeSync = new StoreSync(window, 'refined:aws');
let options;

async function enableFeature({fn = (() => {}), id}) {
  let log = () => {};

  try {
    if (!options) {
      options = await storeSync.get(null);
    }

    const {logging = false} = options;

    if (logging) {
      log = console.log;
    }

    if (options[id] === false) {
      return log('⚠️', 'Skipping', id);
    }

    await fn(log);
    log('✅', id);
  } catch (error) {
    log('❓', id);
    log(error);
  }
}

function onRouteChange(callback) {
  observeElement('#b', callback, {attributes: true, childList: true, characterData: true});
}

function observeAndEnableFeatures() {
  enableFeature(features.keyboardShortcuts);

  onRouteChange(() => {
    enableFeature(features.hideAmazonConsoleLogo);
    enableFeature(features.hideSupport);
    enableFeature(features.hideRegion);
    enableFeature(features.hideFooter);
    enableFeature(features.hideResourceGroups);
    enableFeature(features.showSignOutButton);
    enableFeature(features.showDocumentationButton);
    enableFeature(features.duplicateBreadCrumbNavigation);
  });
}

async function init() {
  await safeElementReady('body');

  for (const feature of runOnInitFeatures) {
    enableFeature(feature);
  }

  await ready();

  observeAndEnableFeatures();
}

init();
