import {default as Actions} from './actions';
import shortcutsContext from '../library/shortcuts';

export default (log) => {
  const keyBoardShortcuts = Actions(window, shortcutsContext, log);

  log('🛂', 'Registry', shortcutsContext.registry);

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

  $(document).keydown((event) => {
    const { key: keyName } = event;

    switch (keyName) {
      case '?':
        $(element).show('slow');
        break;

      case 'Escape':
        const el = $('#refined-aws-keyboard');
        const sibling = $(el).siblings('.overlay');

        $(el).hide();
        $(sibling).hide();
        break;
    }
  });

  const el = $('#shortcuts-all');

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
    $(shortcutsElement).appendTo(el);
  }
};
