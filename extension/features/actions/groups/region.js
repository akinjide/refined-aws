export default (ctx, shortcutsContext, log) => {
  const el = $('#consoleNavHeader > #awsgnav');
  const shortcuts = [];
  const regions = $(el).find('#regionMenuContent');
  const availableRegion = $(regions).find('a.region.available-region');
  // Maybe const activeRegion = $(regions).find('span.region.current-region');

  const REGION_MAPPINGS = {
    'us-east-1': ['u', 'e', '1'],
    'us-east-2': ['u', 'e', '2'],
    'us-west-1': ['u', 'w', '1'],
    'us-west-2': ['u', 'w', '2'],
    'ap-south-1': ['a', 's', '1'],
    'ap-northeast-2': ['a', 'n', '2'],
    'ap-southeast-1': ['a', 'e', '1'],
    'ap-southeast-2': ['a', 's', '2'],
    'ap-northeast-1': ['a', 'n', '1'],
    'ca-central-1': ['c', 'c', '1'],
    'eu-central-1': ['e', 'c', '1'],
    'eu-west-1': ['e', 'w', '1'],
    'eu-west-2': ['e', 'w', '2'],
    'eu-west-3': ['e', 'w', '3'],
    'eu-north-1': ['e', 'n', '1'],
    'sa-east-1': ['s', 'e', '1']
  };

  const mapping = regionId => {
    return REGION_MAPPINGS[regionId];
  };

  if (availableRegion.length > 0) {
    $(availableRegion)
      .each((index, region) => {
        const regionId = $(region).attr('data-region-id');
        const href = $(region).attr('href');
        const title = $(region).text();
        const keys = mapping(regionId);

        shortcuts.push({
          keys,
          name: title,
          description: 'Switch to %REPLACE%',
          href,
        });
      });

    return {
      name: 'Region',
      description: 'Shortcuts for switching AWS region.',
      shortcuts: shortcuts.map(shortcut => {
        const {keys, name, href} = shortcut;

        shortcutsContext.inject(keys.join('+'), () => {
          ctx.location.href = href;
        });

        log('🔡', name, keys);

        return shortcut;
      }),
    };
  }

  return {};
};
