export default (ctx, shortcutsContext, log) => {
  const shortcuts = [
    {
      keys: ['?'],
      name: 'Shortcuts Dialog',
      description: 'Show this %REPLACE%',
    },
    {
      keys: ['esc'],
      name: 'Shortcuts Dialog',
      description: 'Hide this %REPLACE%',
    },
    {
      keys: ['g', 'h'],
      name: 'Home',
      description: 'Go %REPLACE%',
    }
  ]
  .map((shortcut) => {
    const { keys, abbr } = shortcut;

    log('🔡', abbr, keys);

    return shortcut;
  });

  return {
    name: 'General',
    description: 'Shortcuts for site-wide common actions.',
    shortcuts,
  };
};
