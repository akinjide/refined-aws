export default (ctx, shortcutsContext, log) => {
  const el = $('#usernameMenuContent');
  const shortcuts = [];

  const rootAccount = $(el)
    .find('#awsc-active-role-section')
    .find('form#awsc-exit-role-form');

  if (rootAccount.length === 1) {
    shortcuts.push({
      keys: ['s', 'r'],
      name: 'Root',
      description: 'Switch to %REPLACE%',
      form: rootAccount,
    });
  }

  $(el)
    .find('ul#awsc-username-menu-recent-roles')
    .find('li')
    .each((index, li) => {
      if (!$(li).hasClass('awsc-current-role')) {
        const name = $(li).find('input[name="displayName"]').val();
        const form = $(li).children('form');

        shortcuts.push({
          keys: ['s', `${index}`],
          name,
          description: 'Switch to %REPLACE%',
          form,
        });
      }
    });

  return {
    name: 'Role History',
    description: 'Shortcuts for switching recent AWS roles.',
    shortcuts: shortcuts.map(shortcut => {
      const {keys, name, form} = shortcut;

      shortcutsContext.inject(keys.join('+'), () => {
        console.log(form, 'switching ' + name + keys);
        form[0].submit();
      });

      log('🔡', name, keys);

      return shortcut;
    }),
  };
};
