import config from '../config';

const description = 'Go to %REPLACE%';
const pad = '0123456789';

export default () => {
  const cache = {};

  return {
    cache,
    generateShortcut: ({ keys, name, abbr, path, override }) => ({
      keys,
      name,
      abbr,
      uri: `%REPLACE%/${path}`,
      description,
      ...override,
    }),
    generateKeys(identifier, index, log) {
      function gen(index) {
        const first = identifier.substring(0, 1);
        const last = identifier.substring((identifier.length - 1) - index, (identifier.length - index));

        return first + last;
      }

      const val = gen(index);

      if (val.length === 0) {
        log(config.logging.error, `no possible key gen for ${identifier}`);
        return '';
      }

      if (val.length < 2) {
        log(config.logging.warning, `padding ${val} with ${pad}`);
        return this.generateKeys(identifier + pad, index + 1, log);
      }

      if (cache[val]) {
        log(config.logging.warning, `cache match ${cache[val]}; val=${val}; identifier=${identifier}`);
        return this.generateKeys(identifier, index + 1, log);
      }

      cache[val] = identifier;
      log(config.logging.ok, `no cache match ${cache[val]}; val=${val}; identifier=${identifier}`);
      return val;
    }
  };
};
