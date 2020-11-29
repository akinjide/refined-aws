import config from '../config';

export const optionsSync = (el, storeSync) => {
  if (typeof el === 'string') {
    el = $(el);
  }

  $(el).change(async event => {
    const {target: el} = event;
    let {value} = el;
    const {name, validity, type, checked} = el;

    if (!name || !validity.valid) {
      return;
    }

    switch (type) {
      case 'checkbox':
        value = checked;
        break;

      default:
        break;
    }

    console.group(config.logging.sync, 'Synchronising options');
    try {
      await storeSync.set({[name]: value});
      console.info(config.logging.ok, `Saved option ${name} to ${value}`);
    } catch (error) {
      console.log(error);
      console.info(config.logging.error, `Error saving option ${name} to ${value}`);
    }

    console.groupEnd();
  });

  // Remove debug only, invoke apply here maybe.
  storeSync.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
      for (const key in changes) {
        if (changes[key]) {
          const {newValue, oldValue} = changes[key];

          console.log(config.logging.bug, changes);
          console.log('Storage key "%s" in namespace "%s" changed.', 'Old value was "%s", new value is "%s".', key, namespace, oldValue, newValue);

          // Return apply(el, { [key]: newValue })
        }
      }
    }
  });

  const apply = (el, options) => {
    console.group('Updating options');

    for (const name in options) {
      if (options[name]) {
        const elQ = $(el).find(`[name="${name}"]`);
        const [input] = elQ;

        if (input) {
          console.info('❕', name, ':', options[name]);
          const {type} = input;

          switch (type) {
            case 'checkbox':
              input.checked = options[name];
              break;

            default:
              input.value = options[name];
              break;
          }
        } else {
          console.warn(config.logging.warning, 'Stored option {', name, ':', options[name], '} was not found on the page');
        }
      }
    }

    console.groupEnd();
  };

  (async () => {
    const options = await storeSync.get(null);
    apply(el, options);
  })();
};
