export default {
  registry: {},
  inject(shortcutCombination, callback, options) {
    if (shortcutCombination in this.registry) {
      throw new Error(`❓ ${shortcutCombination} exist`);
    }

    // Provide a set of default options
    const defaultOptions = {
      type: 'keydown',
      propagate: false,
      disableInInput: false,
      target: document,
      keycode: false
    };

    if (options) {
      for (const dfo in defaultOptions) {
        if (typeof options[dfo] === 'undefined') {
          options[dfo] = defaultOptions[dfo];
        }
      }
    } else {
      options = defaultOptions;
    }

    shortcutCombination = shortcutCombination.toLowerCase();

    this.registry[shortcutCombination] = {
      callback: event => callback(event),
      target: (typeof options.target === 'string' ? document.getElementById(options.target) : options.target),
      event: options.type
    };
  },
  exec(keyboardElement, shortcutsContext) {
    let keyQueue = [];
    let track = 0;

    const registryKeys = Object.keys(shortcutsContext.registry)
      .map(key => key.split('+'))
      .sort((a, b) => (a[0] < b[0]) ? -1 : 1);
    const maxRegistryKey = registryKeys.reduce((acc, curr) => (acc > curr.length) ? acc : curr.length, 0);
    const el = $('#refined-aws-keyboard');
    const sibling = $(el).siblings('.overlay');

    $(document).keydown(event => {
      let element;
      const {key: keyName} = event;
      const char = String.fromCharCode(event.keyCode).toLowerCase();

      if (event.target) {
        element = event.target;
      } else if (event.srcElement) {
        element = event.srcElement;
      }

      if (element.nodeType === 3) {
        element = element.parentNode;
      }

      // Don't enable shortcut keys in Input, Textarea fields
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.hasAttribute('contenteditable')) {
        return;
      }

      switch (keyName) {
        case '?':
          $(keyboardElement).show('slow');
          break;

        case 'Escape':
          $(el).hide();
          $(sibling).hide();
          break;

        default:
          // Add event.ctrlKey, event.shiftKey, event.altKey, event.metaKey mapping support
          for (let i = 0; i < registryKeys.length; i++) {
            if (registryKeys[i].indexOf(char) === track) {
              keyQueue.push(char);
              track += 1;
              break;
            }

            if (registryKeys[i].indexOf(char) === -1 && i + 1 === registryKeys.length) {
              keyQueue = [];
              track = 0;
            }
          }

          if (shortcutsContext.registry[keyQueue.join('+')]) {
            shortcutsContext.registry[keyQueue.join('+')].callback(event);
            keyQueue = [];
            track = 0;
            return false;
          }

          if (keyQueue.length === maxRegistryKey) {
            keyQueue = [];
            track = 0;
          }
      }

      // Maybe stop the event
      // e.cancelBubble is supported by IE - this will kill the bubbling process.
      // event.cancelBubble = true;
      // event.returnValue = false;

      // Works in Firefox e.stopPropagation
      // if (event.stopPropagation) {
      //   event.stopPropagation();
      //   event.preventDefault();
      // }

      return true;
    });
  }
};
