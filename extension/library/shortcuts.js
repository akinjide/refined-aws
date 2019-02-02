export default {
  registry: {},
  inject: function (shortcutCombination, callback, options) {
    if (shortcutCombination in this.registry) {
      throw ('❓', shortcutCombination, 'exist');
    }

    // Provide a set of default options
    var defaultOptions = {
      'type': 'keydown',
      'propagate': false,
      'disable_in_input': false,
      'target': document,
      'keycode': false
    };

    if (!options) {
      options = defaultOptions;
    } else {
      for (var dfo in defaultOptions) {
        if (typeof options[dfo] == 'undefined') {
          options[dfo] = defaultOptions[dfo];
        }
      }
    }

    shortcutCombination = shortcutCombination.toLowerCase();

    this.registry[shortcutCombination] = {
      'callback': (event) => callback(event),
      'target': (typeof options.target == 'string' ? document.getElementById(options.target) : options.target),
      'event': options['type']
    };
  },
  exec: function(keyboardElement, shortcutsContext, options) {
    const REGISTRY_KEYS = Object.keys(shortcutsContext.registry)
      .map((key) => key.split('+'))
      .sort((a, b) => (a[0] < b[0]) ? -1 : 1);
    let keyQueue = [];
    let track = 0;
    const MAX_REGISTRY_KEY = REGISTRY_KEYS.reduce((acc, curr) => (acc > curr.length) ? acc : curr.length, 0);

    $(document).keydown((event) => {
      let element;
      const { key: keyName } = event;

      // Don't enable shortcut keys in Input, Textarea fields
      if (event.target) {
        element = event.target;
      } else if (event.srcElement) {
        element = event.srcElement;
      }

      if (element.nodeType == 3) {
        element = element.parentNode;
      }

      if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') {
        return;
      }

      switch (keyName) {
        case '?':
          $(keyboardElement).show('slow');
          break;

        case 'Escape':
          const el = $('#refined-aws-keyboard');
          const sibling = $(el).siblings('.overlay');

          $(el).hide();
          $(sibling).hide();
          break;

        default:
          const char = String.fromCharCode(event.keyCode).toLowerCase();
          console.log(event.ctrlKey,event.shiftKey,event.altKey, event.metaKey, char);

          for (var i = 0; i < REGISTRY_KEYS.length; i++) {
            if (REGISTRY_KEYS[i].indexOf(char) == track) {
              keyQueue.push(char);
              track += 1;
              break;
            }

            if (REGISTRY_KEYS[i].indexOf(char) == -1 && i + 1 == REGISTRY_KEYS.length) {
              keyQueue = [];
              track = 0;
            }
          }

          const SHORTCUT = shortcutsContext.registry[keyQueue.join('+')];

          if (SHORTCUT) {
            keyQueue = [];
            track = 0;
            SHORTCUT.callback(event)
          }

          if (keyQueue.length == MAX_REGISTRY_KEY) {
            keyQueue = [];
            track = 0;
          }
          console.log(keyQueue, track);
      }

      // Stop the event
        // e.cancelBubble is supported by IE - this will kill the bubbling process.
        // event.cancelBubble = true;
        // event.returnValue = false;

        // // e.stopPropagation works in Firefox.
        // if (event.stopPropagation) {
        //   event.stopPropagation();
        //   event.preventDefault();
        // }

        // return false;
    });
  }
}
