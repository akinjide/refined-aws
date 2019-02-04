export default (ctx, uri, regx, shortcutsContext, log) => {
  const shortcuts = [
    {
      keys: ['g', 'i'],
      name: 'Identity and Access Management',
      abbr: 'iam',
      description: 'Go to %REPLACE%',
    }
  ];

  shortcuts
    .map(shortcut => {
      const {keys, abbr} = shortcut;

      shortcutsContext.inject(keys.join('+'), () => {
        ctx.location.href = uri.replace(regx, `.com/${abbr}/`);
      });

      log('🔡', abbr, keys);

      return shortcut;
    });

  return {
    name: 'Security, Identity, & Compliance',
    description: 'Shortcuts for AWS Security, Identity, & Compliance services.',
    shortcuts,
  };
};
