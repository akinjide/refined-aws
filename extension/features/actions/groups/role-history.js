// TODO: bind form submit action.
export default (ctx, shortcutsContext, log) => {
  const el = $('#usernameMenuContent');
  let shortcuts = [];

  const rootAccount = $(el)
    .find('#awsc-active-role-section')
    .find('#awsc-exit-role-form');

  if (rootAccount.length) {
    shortcuts.push({
      keys: ['s', 'r'],
      name: 'Root',
      description: 'Switch to %REPLACE%',
      fn: () => {}
    });
  }

  $(el)
    .find('#awsc-username-menu-recent-roles')
    .find('li')
    .each((index, list) => {
      const name = $(list).find('input[name="displayName"]').val();
      const form = $(list).children('form');

      shortcuts.push({
        keys: ['s', `${index}`],
        name,
        description: 'Switch to %REPLACE%',
        fn: $(form),
      });
    });

  return {
    name: 'Role History',
    description: 'Shortcuts for switching recent AWS roles.',
    shortcuts: shortcuts.map((shortcut) => {
      const { keys, name, fn } = shortcut;

      shortcutsContext.inject(keys.join('+'), (e) => {
        console.log(fn, 'switching ' + name + keys);
      });

      log('🔡', name, keys);

      return shortcut;
    }),
  };
};
