import {keyboard} from '../../common/keyboard';

const keyboardFn = keyboard();

export const services = (ctx, config, shortcutsContext, log) => {
  const tmpServices = {};
  const el = $('#consoleNavHeader > #awsgnav');
  const servicesMenu = $(el).find('#servicesMenuContent #awsc-services-container');
  const serviceGroups = $(servicesMenu).find('ul.services-group');

  // @TODO: after generating key maps cache on local device
  // check for local cache
  // if available use local cache
  // otherwise generate new and cache on local device
  // clear local cache during chrome update or install
  // me dweeb, haha install phase won't have any cache on local device

  if (serviceGroups.length > 0) {
    $(serviceGroups).each((index, serviceGroup) => {
      let serviceHeaderIdentifier;

      $(serviceGroup).find('li').each((index, service) => {
        const filterFn = c => c.startsWith('ico-');
        const headerMatch = [...$(service).attr('class').split(' ')].some(filterFn);

        if (headerMatch) {
          const title = $(service).text();
          const serviceHeaderClassNames = $(service).attr('class');

          ([serviceHeaderIdentifier] = serviceHeaderClassNames.split(' ').filter(filterFn));
          tmpServices[serviceHeaderIdentifier] = {
            name: title,
            // Remove maybe? description: 'Shortcuts for x services.',
            shortcuts: [],
          };
        } else {
          const serviceIdentifier = $(service).attr('data-service-id');
          const serviceHref = $(service).attr('data-service-href');
          const serviceTitle = $(service).find('a > span.service-label').text();
          const keys = keyboardFn.genKeys(serviceIdentifier, 0, log);

          if (tmpServices[serviceHeaderIdentifier]) {
            tmpServices[serviceHeaderIdentifier].shortcuts.push(
              keyboardFn.genShortcut(['g', ...keys.split('')], serviceTitle, serviceIdentifier, '', {uri: serviceHref})
            );
          }
        }
      });
    });

    log('✅', 'services key cache', keyboardFn.cache);
  }

  log('✅', 'aws services', tmpServices);

  const defaultServices = [];

  for (const service in tmpServices) {
    if (tmpServices[service]) {
      const {name, description, shortcuts} = tmpServices[service];

      defaultServices.push({
        name,
        description,
        shortcuts: shortcuts.map(shortcut => {
          const {keys, uri, abbr} = shortcut;

          // Remove, maybe? shortcut.uri = uri.replace('%REPLACE%', config.baseURL);
          shortcutsContext.inject(keys.join('+'), () => {
            ctx.location.replace(uri);
          });

          log('🔡', abbr, keys);

          return shortcut;
        }),
      });
    }
  }

  return defaultServices;
};
