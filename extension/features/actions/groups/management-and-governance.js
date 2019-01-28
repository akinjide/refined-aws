export default (ctx, uri, regx, shortcutsContext, log) => {
  const description = 'Go to %REPLACE%'
  const shortcuts = [
    {
      keys: ['g', '4'],
      name: 'CloudFormation',
      abbr: 'cloudformation',
      description,
    },
    {
      keys: ['g', 's'],
      name: 'Systems Manager',
      abbr: 'systems-manager',
      description,
    },
    {
      keys: ['g', 'w'],
      name: 'CloudWatch',
      abbr: 'cloudwatch',
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
    name: 'Management & Governance',
    description: 'Shortcuts for AWS Management & Governance services.',
    shortcuts,
  };
};


