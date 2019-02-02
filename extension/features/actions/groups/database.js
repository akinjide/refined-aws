export default (ctx, uri, regx, shortcutsContext, log) => {
  const description = 'Go to %REPLACE%';
  const shortcuts = [
    {
      keys: ['g', 't'],
      name: 'Amazon Redshift',
      abbr: 'redshift',
      description,
    },
    {
      keys: ['g', 'k'],
      name: 'ElastiCache',
      abbr: 'elasticache',
      description,
    },
    {
      keys: ['g', 'y'],
      name: 'DynamoDB',
      abbr: 'dynamodb',
      description,
    },
    {
      keys: ['g', 'r'],
      name: 'Relational Database Service',
      abbr: 'rds',
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
    name: 'Database',
    description: 'Shortcuts for AWS Database services.',
    shortcuts,
  };
};
