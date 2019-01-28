export default (ctx, uri, regx, shortcutsContext, log) => {
  const description = 'Go to %REPLACE%';
  const shortcuts = [
    {
      keys: ['g', 'm'],
      name: 'Amazon MQ',
      abbr: 'amazon-mq',
      description,
    },
    {
      keys: ['g', 'n'],
      name: 'Simple Notification Service',
      abbr: 'sns',
      description,
    },
    {
      keys: ['g', 'q'],
      name: 'Simple Queue Service',
      abbr: 'sqs',
      description,
    }
  ]
  .sort((a, b) => (a.keys[1] < b.keys[1]) ? -1 : 1)
  .map((shortcut) => {
    const { keys, abbr } = shortcut;

    shortcutsContext.inject(keys.join('+'), (e) => {
      ctx.location.href = uri.replace(regx, `.com/${abbr}/`);
    });

    log('🔡', abbr, keys);

    return shortcut;
  });

  return {
    name: 'Application Integration',
    description: 'Shortcuts for AWS Application Integration services.',
    shortcuts,
  };
};
