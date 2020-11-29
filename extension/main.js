import {defaultFeatures} from './features';
import {Store, StoreSync, job} from './lib/core';
import config from './config';

const storeSync = new StoreSync(window, config.namespace.sync);
const store = new Store(window, config.namespace.local);

// Save default features option value under chrome storage sync.
async function main() {
  job({
    name: 'invalidate',
    ctx: window,
    frequency: config.cache.frequency,
    fn: async () => {
      try {
        await Promise.all([
          store.remove(store._prefix + config.cache.servicesKey),
          store.remove(store._prefix + config.cache.regionsKey),
        ]);
        console.log(config.logging.ok, 'Invalidating cache');
      } catch (error) {
        console.log(config.logging.error, 'Error invalidating cache');
        console.log(error);
      }
    },
  });

  try {
    const options = await storeSync.get(null);
    await storeSync.set({...options, ...defaultFeatures});
    console.log(config.logging.ok, 'Saved default');
  } catch (error) {
    console.log(config.logging.error, 'Error saving default');
    console.log(error);
  }
}

async function installerHandler({reason}) {
  if (!config.devMode) {
    if (reason === 'install' || reason === 'update') {
      window.chrome.runtime.openOptionsPage();
    }
  }
}

window.chrome.runtime.onInstalled.addListener(installerHandler);

main();
