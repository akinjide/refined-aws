import shortcutsLib from '../lib/shortcuts';
import {Store} from '../lib/core';
import config from '../config';

const shortcutsFn = shortcutsLib();

export default async (ctx, keyboard, log) => {
  const store = new Store(ctx, config.namespace.local);
  const cacheKey = store._prefix + config.cache.regionsKey;
  let awsRegions;

  try {
    const storeValue = await store.get(cacheKey);
    if (storeValue[cacheKey]) {
      ({ regions: awsRegions } = JSON.parse(storeValue[cacheKey]));
      log(awsRegions);
      log(config.logging.ok, 'AWS regions retrieved');
    }
  } catch (error) {
    log(config.logging.error, 'Error retrieving AWS regions');
    log(error);
  }

  if (!awsRegions) {
    const el = $('header#awsc-nav-header div[data-testid="awsc-nav-more-menu-list"] ul#awsc-navigation__more-menu--list');
    const regions = $(el).find('div[data-testid="awsc-nav-regions-menu-content"] ul#menu--regions li');
    awsRegions = [];

    if (regions.length > 0) {
      $(regions)
        .each((index, region) => {
          const anchor = $(region).find('a');
          const regionId = $(anchor).attr('data-region-id');
          const href = $(anchor).attr('href');
          const [title] = $(anchor).find('span').text().split(regionId);

          awsRegions.push(
            shortcutsFn.generateShortcut({
              keys: config.regionMappings[regionId],
              name: title,
              abbr: regionId,
              override: {
                description: 'Switch to %REPLACE%',
                href,
              },
            })
          );
        });

      log(awsRegions);

      try {
        await store.set({ [cacheKey]: JSON.stringify({ regions: awsRegions }) });
        log(config.logging.ok, 'Saved AWS regions');
      } catch (error) {
        log(config.logging.error, 'Error saving AWS regions');
        log(error);
      }
    }
  }

  if (awsRegions) {
    return {
      name: 'Regions',
      description: 'Shortcuts for switching AWS region.',
      shortcuts: awsRegions.map(shortcut => {
        const {keys, name, abbr, href} = shortcut;

        if (!keys) {
          log(config.logging.error, `no key mapping for ${name}`);
        }

        if (keys) {
          keyboard.inject(keys.join('+'), () => {
            ctx.location.href = href;
          });

          log('🔡', abbr, keys);
        }

        return shortcut;
      }),
    };
  }

  return {};
};
