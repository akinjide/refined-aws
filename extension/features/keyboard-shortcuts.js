import shortcutsContext from '../library/shortcuts';
import {default as actions} from './actions';

export default log => {
  const keyBoardShortcuts = actions(window, shortcutsContext, log);
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

  log('🛂', 'Registry', shortcutsContext.registry);
  shortcutsContext.exec(element, shortcutsContext);

  for (const {name = 'Generic', shortcuts = []} of keyBoardShortcuts) {
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
