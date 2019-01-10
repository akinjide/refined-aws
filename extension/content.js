import {runOnInitFeatures} from './features';

async function init() {
  for (const feature of runOnInitFeatures) {
    enableFeature(feature);
  }
}

async function enableFeature({fn, id}) {
  try {
    await fn();
    console.log('✅', id);
  } catch (error) {
    console.log('❌', id);
    console.error(error);
  }
}

init();
