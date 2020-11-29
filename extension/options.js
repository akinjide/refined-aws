import {groupFeatures} from './features';
import {StoreSync} from './lib/core';
import {optionsSync} from './lib/options-sync';
import config from './config';

const storeSync = new StoreSync(window, config.namespace.sync);
const el = $('#features');
const lockedFeature = [];

for (const [category, features] of groupFeatures('category')) {
  const featuresContainer = $('<div class="features-container"></div>');
  const featuresElement = $(
    `<div class="${category} features">
      <div class="features-header">${category}</div>
    </div>`
  );

  for (const {label, id, locked = false} of features) {
    if (locked) {
      lockedFeature.push(id);
    }

    const element = $(
      `<div class="feature-body ${id} ${locked ? 'locked-feature' : ''}">
        <label>
          <input type="checkbox" name="${id}">
          <div class="feature-label">
            ${label}
          </div>
        </label>
      </div>`
    );

    $(element).appendTo(featuresContainer);
  }

  $(featuresContainer).appendTo(featuresElement);
  $(featuresElement).appendTo(el);
}

if (lockedFeature.length > 0) {
  for (const id of lockedFeature) {
    $(`input[name='${id}']`).prop('disabled', true);
  }
}

optionsSync(el, storeSync);
