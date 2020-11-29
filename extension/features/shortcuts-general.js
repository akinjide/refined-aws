import shortcutsLib from '../lib/shortcuts';
import config from '../config';

const shortcutsFn = shortcutsLib();

export default (ctx, keyboard, log) => {
  const awsHome = `https://${config.baseURL}/console/home`;
  const general = [
    shortcutsFn.generateShortcut({
      keys: ['?'],
      name: 'Shortcuts Dialog',
      abbr: 'help',
      override: {description: 'Show this %REPLACE%'},
    }),
    shortcutsFn.generateShortcut({
      keys: ['esc'],
      name: 'Shortcuts Dialog',
      abbr: 'escape',
      override: {description: 'Hide this %REPLACE%'},
    }),
    shortcutsFn.generateShortcut({
      keys: ['g', 'h', 'o'],
      name: 'Home',
      abbr: 'home',
      override: {description: 'Go %REPLACE%'},
    }),
    // shortcutsFn.generateShortcut({
    //   keys: ['q', 'q'],
    //   name: 'Quick Open',
    //   abbr: 'quickopen',
    //   override: {description: 'Quick Search Services'},
    // }),
  ];

  return {
    name: 'General',
    description: 'Shortcuts for site-wide common actions.',
    shortcuts: general.map(shortcut => {
      const {keys, abbr} = shortcut;

      switch (abbr) {
        case 'home':
          keyboard.inject(keys.join('+'), () => {
            ctx.location.href = awsHome;
          });

          break;

        default:
      }

      log('🔡', name, keys);

      return shortcut;
    }),
  };
};
