import shortcutsLib from '../lib/shortcuts';

const shortcutsFn = shortcutsLib();

export default (ctx, keyboard, log) => {
  const el = $('header#awsc-nav-header div[data-testid="awsc-nav-more-menu-list"] ul#awsc-navigation__more-menu--list');
  const account = $(el).find('div[data-testid="awsc-nav-account-menu-content"]');
  const roles = $(account).find(' ul#awsc-username-menu-recent-roles li');
  const rootAccount = $(account).find('form input[data-testid="awsc-exit-role"]');
  const shortcuts = [];

  if (rootAccount.length === 1) {
    shortcuts.push(shortcutsFn.generateShortcut({
      keys: ['s', 'r', 'r'],
      name: rootAccount.val(),
      override: {
        description: 'Switch %REPLACE%',
        input: rootAccount,
      },
    }));
  }

  if (roles.length > 0) {
    $(roles)
      .each((index, role) => {
        const name = $(role).find('input[name="displayName"]').val();
        const input = $(role).find(`form input#role-history__list__item__${index}`);

        if (!$(input).prop('disabled')) {
          shortcuts.push(shortcutsFn.generateShortcut({
            keys: ['s', 'r', `${index}`],
            name,
            abbr: `role-${index}`,
            override: {
              description: 'Switch to %REPLACE%',
              input,
            },
          }));
        }
      });

    return {
      name: 'Roles',
      description: 'Shortcuts for switching recent AWS roles.',
      shortcuts: shortcuts.map(shortcut => {
        const {keys, name, input} = shortcut;

        keyboard.inject(keys.join('+'), () => {
          $(input).click();
        });

        log('🔡', name, keys);

        return shortcut;
      }),
    };
  }

  return {};
};
