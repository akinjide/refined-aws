export default (ctx, uri, regx, shortcutsContext, log) => {
  const description = 'Go to %REPLACE%';
  const shortcuts = [
    {
      keys: ['g', '3'],
      name: 'Simple Storage Service',
      abbr: 's3',
      description,
    },
    {
      keys: ['g', 'z'],
      name: 'S3 Glacier',
      abbr: 'glacier',
      description,
    },
    {
      keys: ['g', 'f'],
      name: 'Elastic File System',
      abbr: 'efs',
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
    name: 'Storage',
    description: 'Shortcuts for AWS Storage services.',
    shortcuts,
  };
};
