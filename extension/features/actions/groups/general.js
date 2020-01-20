import {keyboard} from '../../common/keyboard';

const keyboardFn = keyboard();

export default (ctx, config, shortcutsContext, log) => {
  const shortcuts = [
    keyboardFn.genShortcut(['?'], 'Shortcuts Dialog', '', '', {description: 'Show this %REPLACE%'}),
    keyboardFn.genShortcut(['esc'], 'Shortcuts Dialog', '', '', {description: 'Hide this %REPLACE%'}),
    keyboardFn.genShortcut(['g', 'h', 'o'], 'Home', 'home', '', {description: 'Go %REPLACE%'}),
    keyboardFn.genShortcut(['q', 'q'], 'Quick Open', 'quickopen', '', {description: 'Quick Search Services'}),
  ];

  const elRoles = $('#usernameMenuContent').find('#awsc-switch-role');

  if (elRoles.length === 1) {
    shortcuts.push(
      keyboardFn.genShortcut(['s', 's', 'r'], 'Switch Role', 'roleswitch', '', {description: '%REPLACE%'})
    );
  }

  shortcuts
    .map(shortcut => {
      const awsHome = `https://${config.baseURL}/console/home`;
      const {keys, abbr} = shortcut;

      const el = $('#servicesMenuContent .awsc-services-search');
      const input = $(el).find('#awsc-input-wrapper > input');
      const parent = $(el).parent();
      const siblings = $(el).siblings();
      const styles = {
        default: {
          parent: {
            'min-height': '310px',
            'border-radius': '0 0 4px 4px',
            display: 'none'
          },
          siblings: {
            display: 'block'
          },
          el: {
            padding: '26px 1.5% 0 1.5%',
          },
          filterGroup: {
            display: 'table'
          },
          inputWrapper: {
            width: '80%'
          }
        },
        override: {
          parent: {
            'min-height': '20px',
            'border-radius': '4px',
            display: 'block'
          },
          siblings: {
            display: 'none'
          },
          el: {
            padding: '10px'
          },
          filterGroup: {
            display: 'none'
          },
          inputWrapper: {
            width: '96%'
          }
        }
      };

      const castStyles = styles => {
        $(parent).css(styles.parent);

        $(siblings)
          .each((index, sibling) => {
            $(sibling).css(styles.siblings);
          });

        $(el).css(styles.el);
        $(el).find('#awsc-input-wrapper').css(styles.inputWrapper);
        $(el).find('#awsc-services-search-filter-group').css(styles.filterGroup);
      };

      switch (abbr) {
        case 'home':
          shortcutsContext.inject(keys.join('+'), () => {
            ctx.location.href = awsHome;
          });

          break;

        case 'roleswitch':
          shortcutsContext.inject(keys.join('+'), () => {
            $(elRoles)[0].click();
          });

          break;

        case 'quickopen':
          input.on('focusout focusin', e => {
            e.target.value = '';
          });

          shortcutsContext.inject(keys.join('+'), () => {
            castStyles(styles.override);

            input.focus();
            input.focusout(() => {
              const defaultStyles = $(parent).css(['min-height', 'border-radius', 'display']);

              if (defaultStyles['min-height'] === styles.default.parent['min-height']) {
                return null;
              }

              setTimeout(() => castStyles(styles.default), 200);
            });
          });

          break;

        default:
      }

      log('🔡', abbr, keys);

      return shortcut;
    });

  return {
    name: 'General',
    description: 'Shortcuts for site-wide common actions.',
    shortcuts,
  };
};
