export default (ctx, uri, regx, shortcutsContext, log) => {
  const description = 'Go to %REPLACE%';
  const shortcuts = [
    {
      keys: ['g', 'o'],
      name: 'CodeBuild',
      abbr: 'codebuild',
      description,
    },
    {
      keys: ['g', 'd'],
      name: 'CodeDeploy',
      abbr: 'codedeploy',
      description,
    },
    {
      keys: ['g', 'p'],
      name: 'CodePipeline',
      abbr: 'codepipeline',
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
    name: 'Developer Tools',
    description: 'Shortcuts for AWS Developer Tools services.',
    shortcuts,
  };
};
