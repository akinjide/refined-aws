export class Store {
  constructor(ctx, namespace) {
    this._ctx = ctx;
    this._storage = this._ctx.chrome.storage;
    this._prefix = `${namespace}:local:`;
  }

  get storage() {
    return this._storage;
  }

  get(key) {
    return this._promisify(this._storage.local, 'get', key);
  }

  set(data) {
    return this._promisify(this._storage.local, 'set', data);
  }

  usage(key) {
    return this._promisify(this._storage.local, 'getBytesInUse', key);
  }

  remove(key) {
    return this._promisify(this._storage.local, 'remove', key);
  }

  _promisify(fn, method, argument) {
    const handler = (resolve, reject) => response => {
      const error = this._ctx.chrome.runtime.lastError;
      return error ? reject(new Error(error)): resolve(response || {});
    };

    return new Promise((resolve, reject) => fn[method](argument, handler(resolve, reject)));
  }
}
