export default (ctx, shortcutsContext, log) => {
  const shortcuts = [
    {
      keys: ['?'],
      name: 'Shortcuts Dialog',
      abbr: '',
      description: 'Show this %REPLACE%',
    },
    {
      keys: ['esc'],
      name: 'Shortcuts Dialog',
      abbr: '',
      description: 'Hide this %REPLACE%',
    },
    {
      keys: ['g', 'h'],
      name: 'Home',
      abbr: 'home',
      description: 'Go %REPLACE%',
    }
  ]
  .map((shortcut) => {
    const AWS_HOME = 'https://console.aws.amazon.com/console/home';
    const { keys, abbr } = shortcut;

    if (abbr == 'home') {
      shortcutsContext.inject(keys.join('+'), (e) => {
        ctx.location.href = AWS_HOME;
      });
    }

    log('🔡', abbr, keys);

    return shortcut;
  });

  return {
    name: 'General',
    description: 'Shortcuts for site-wide common actions.',
    shortcuts,
  };
};
