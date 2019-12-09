import {keyboard} from '../../common/keyboard';

const keyboardFn = keyboard();

export default (ctx, shortcutsContext, log) => {
  const el = $('#usernameMenuContent');
  const shortcuts = [];
  const rootAccount = $(el)
    .find('#awsc-active-role-section')
    .find('form#awsc-exit-role-form');

  if (rootAccount.length === 1) {
    const input = $(rootAccount).find('#awsc-exit-role');

    shortcuts.push(
      keyboardFn.genShortcut(['s', 'r', 'r'], input.val(), '', '', {
        description: '%REPLACE% @ ROOT',
        input,
      })
    );
  }

  $(el)
    .find('ul#awsc-username-menu-recent-roles')
    .find('li')
    .each((index, li) => {
      if (!$(li).hasClass('awsc-current-role')) {
        const name = $(li).find('input[name="displayName"]').val();
        const input = $(li).children('form').find(`#awsc-recent-role-switch-${index}`);

        shortcuts.push(
          keyboardFn.genShortcut(['s', 'r', `${index}`], name, '', '', {
            description: 'Switch to %REPLACE%',
            input,
          })
        );
      }
    });

  return {
    name: 'Role History',
    description: 'Shortcuts for switching recent AWS roles.',
    shortcuts: shortcuts.map(shortcut => {
      const {keys, name, input} = shortcut;

      shortcutsContext.inject(keys.join('+'), () => {
        $(input)[0].click();
      });

      log('🔡', name, keys);

      return shortcut;
    }),
  };
};
