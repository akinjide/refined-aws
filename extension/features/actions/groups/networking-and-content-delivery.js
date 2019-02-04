export default (ctx, uri, regx, shortcutsContext, log) => {
  const description = 'Go to %REPLACE%';
  const shortcuts = [
    {
      keys: ['g', 'c'],
      name: 'CloudFront',
      abbr: 'cloudfront',
      description,
    },
    {
      keys: ['g', '5'],
      name: 'Route 53',
      abbr: 'route53',
      description,
    },
    {
      keys: ['g', 'v'],
      name: 'VPC',
      abbr: 'vpc',
      description,
    }
  ];

  shortcuts
    .sort((a, b) => (a.keys[1] < b.keys[1]) ? -1 : 1)
    .map(shortcut => {
      const {keys, abbr} = shortcut;

      shortcutsContext.inject(keys.join('+'), () => {
        ctx.location.href = uri.replace(regx, `.com/${abbr}/`);
      });

      log('🔡', abbr, keys);

      return shortcut;
    });

  return {
    name: 'Networking & Content Delivery',
    description: 'Shortcuts for AWS Networking & Content Delivery services.',
    shortcuts,
  };
};
