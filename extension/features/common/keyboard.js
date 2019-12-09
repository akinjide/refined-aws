const description = 'Go to %REPLACE%';

export const keyboard = () => {
  const cache = {};

  return {
    cache,
    genShortcut: (keys, name, abbr, path, override) => ({
      keys,
      name,
      abbr,
      uri: `%REPLACE%/${path}`,
      description,
      ...override,
    }),
    genKeys(identifier, index, log) {
      function gen(index) {
        const first = identifier.substring(0, 1);
        const last = identifier.substring((identifier.length - 1) - index, (identifier.length - index));

        return first + last;
      }

      const val = gen(index);

      if (val.length === 0) {
        log('❌', `no possible key gen for ${identifier}`);
        return '';
      }

      if (val.length < 2) {
        log('⚠️', `padding ${val} with 0123456789`);
        return this.genKeys(identifier + '0123456789', index + 1, log);
      }

      if (cache[val]) {
        log('⚠️', `cache match ${cache[val]}; ${val}; ${identifier}`);
        return this.genKeys(identifier, index + 1, log);
      }

      cache[val] = identifier;
      log('✅', `no cache match ${cache[val]}; ${val}; ${identifier}`);
      return val;
    }
  };
};
