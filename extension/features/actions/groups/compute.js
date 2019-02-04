export default (ctx, uri, regx, shortcutsContext, log) => {
  const description = 'Go to %REPLACE%';
  const shortcuts = [
    {
      keys: ['g', '2'],
      name: 'Elastic Compute Cloud',
      abbr: 'ec2',
      description,
    },
    {
      keys: ['g', 'l'],
      name: 'Lambda',
      abbr: 'lambda',
      description,
    },
    {
      keys: ['g', 'b'],
      name: 'Elastic Beanstalk',
      abbr: 'elasticbeanstalk',
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
    name: 'Compute',
    description: 'Shortcuts for AWS Compute services.',
    shortcuts,
  };
};
