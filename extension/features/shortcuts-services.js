import shortcutsLib from '../lib/shortcuts';
import {Store} from '../lib/core';
import config from '../config';

const shortcutsFn = shortcutsLib();

export default async (ctx, keyboard, log) => {
  const store = new Store(ctx, config.namespace.local);
  const cacheKey = store._prefix + config.cache.servicesKey;
  const groupServices = [];
  let awsServices;

  try {
    const storeValue = await store.get(cacheKey);
    if (storeValue[cacheKey]) {
      awsServices = JSON.parse(storeValue[cacheKey]);
      log(awsServices);
      log(config.logging.ok, 'AWS services retrieved');
    }
  } catch (error) {
    log(config.logging.error, 'Error retrieving AWS services');
    log(error);
  }

  if (!awsServices) {
    const el = $('header#awsc-nav-header div[data-testid="awsc-nav-service-menu"]');
    const services = $(el).find('div[data-testid="awsc-nav-service-list"]').children();
    awsServices = {};

    if (services.length > 0) {
      $(services).each((index, servicegroup) => {
        const category = $(servicegroup).find('div i+span').text();

        if (category && !awsServices[category]) {
          awsServices[category] = {
            name: category,
            shortcuts: [],
          };
        }

        $(servicegroup).find('ol li').each((index, service) => {
          const title = $(service).find('a span').text();
          const href = $(service).find('a').attr('href');
          const id = $(service).find('a').attr('data-testid');
          const keys = shortcutsFn.generateKeys(id, 0, log);

          if (awsServices[category]) {
            awsServices[category].shortcuts.push(shortcutsFn.generateShortcut({
              keys: ['g', ...keys.split('')],
              name: title,
              abbr: id,
              override: {
                uri: href,
              },
            }));
          }
        });
      });
    }

    log(config.logging.ok, 'services key cache', shortcutsFn.cache);

    try {
      await store.set({ [cacheKey]: JSON.stringify(awsServices) });
      log(config.logging.ok, 'Saved AWS services');
    } catch (error) {
      log(config.logging.error, 'Error saving AWS services');
      log(error);
    }
  }

  for (const service in awsServices) {
    if (awsServices[service]) {
      const {name, description, shortcuts} = awsServices[service];

      groupServices.push({
        name,
        description,
        shortcuts: shortcuts.map(shortcut => {
          const {keys, uri, abbr} = shortcut;

          keyboard.inject(keys.join('+'), () => {
            ctx.location.replace(uri);
          });

          log('🔡', abbr, keys);

          return shortcut;
        }),
      });
    }
  }

  return groupServices;
};
