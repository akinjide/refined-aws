export default (ctx, uri, regx, shortcutsContext, log) => {
  const shortcuts = [
    {
      keys: ['g', 'e'],
      name: 'Simple Email Service',
      abbr: 'ses',
      description: 'Go to %REPLACE%',
    }
  ].map((shortcut) => {
    const { keys, abbr } = shortcut;

    shortcutsContext.inject(keys.join('+'), (e) => {
      ctx.location.href = uri.replace(regx, `.com/${abbr}/`);
    });

    log('🔡', abbr, keys);

    return shortcut;
  });

  return {
    name: 'Customer Engagement',
    description: 'Shortcuts for AWS Customer Engagement services.',
    shortcuts,
  };
};
