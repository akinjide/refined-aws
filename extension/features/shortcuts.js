import keyboard from '../lib/keyboard';
import general from './shortcuts-general';
import roles from './shortcuts-roles';
import regions from './shortcuts-regions';
import services from './shortcuts-services';
import config from '../config';

const allShortcuts = async (ctx, keyboard, log) => [
  general(ctx, keyboard, log),
  roles(ctx, keyboard, log),
  await regions(ctx, keyboard, log),
  ...(await services(ctx, keyboard, log)),
];

export default async log => {
  const groupShortcuts = await allShortcuts(window, keyboard, log);
  const element = $(`
    <div id="refined-aws-keyboard">
      <div class="refined-aws-container">
        <div>
          <h2>
            <div class="refined-aws-header">
              Keyboard Shortcuts
            </div>
          </h2>

          <div id="shortcuts-all"></div>
        </div>
      </div>
    </div>
    <div class="overlay"></div>
  `);

  $(element).appendTo($('body'));
  $(element).hide('slow');
  $('.overlay').click(() => $(element).hide('slow'));

  log(config.logging.registry, 'Registry', keyboard.registry);
  keyboard.exec(element, keyboard);

  for (const {name = 'Generic', shortcuts = []} of groupShortcuts) {
    if (shortcuts.length > 0) {
      const shortcutsContainer = $('<div class="shortcuts-container"></div>');
      const shortcutsElement = $(
        `<div class="shortcuts">
          <div class="shortcuts-header">${name}</div>
        </div>`
      );

      for (const {keys = [], description = '', name = ''} of shortcuts) {
        const element = $(
          `<div class="shortcut-body">
            <label>
              <div class="shortcut-label">
                ${description.replace('%REPLACE%', `${name}`)}
              </div>
              <div>${keys.map(key => `<kbd>${key}</kbd>`).join('')}</div>
            </label>
          </div>`
        );

        $(element).appendTo(shortcutsContainer);
      }

      $(shortcutsContainer).appendTo(shortcutsElement);
      $(shortcutsElement).appendTo($('#shortcuts-all'));
    }
  }
};
