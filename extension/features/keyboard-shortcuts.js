import {default as Actions} from './actions';
import shortcutsContext from '../library/shortcuts';

export default (log) => {
  const keyBoardShortcuts = Actions(window, shortcutsContext, log);
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

  for (const { name, shortcuts } of keyBoardShortcuts) {
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
};
