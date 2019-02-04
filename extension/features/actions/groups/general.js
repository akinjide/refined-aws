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
  ];

  const el = $('#usernameMenuContent')
    .find('#awsc-switch-role');

  if (el.length === 1) {
    shortcuts.push({
      keys: ['s', 's'],
      name: 'Switch Role',
      abbr: 'roleswitch',
      description: '%REPLACE%',
    });
  }

  shortcuts
    .map(shortcut => {
      const AWS_HOME = 'https://console.aws.amazon.com/console/home';
      const {keys, abbr} = shortcut;

      if (abbr === 'home') {
        shortcutsContext.inject(keys.join('+'), () => {
          ctx.location.href = AWS_HOME;
        });
      }

      if (abbr === 'roleswitch') {
        shortcutsContext.inject(keys.join('+'), () => {
          $(el)[0].click();
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
