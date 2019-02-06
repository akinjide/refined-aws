export default (ctx, uri, regx, shortcutsContext, log) => {
  const description = 'Go to %REPLACE%';
  const shortcuts = [
    {
      keys: ['g', 'x'],
      name: 'AWS RoboMaker',
      abbr: 'robomaker',
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
    name: 'Robotics',
    description: 'Shortcuts for Robotics services.',
    shortcuts,
  };
};
