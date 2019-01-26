export class StoreSync {
  constructor(ctx, namespace) {
    this._ctx = ctx;
    this._storage = this._ctx.chrome.storage;
    this._prefix = `${namespace}:sync:`;
  }

  get storage() {
    return this._storage;
  }

  _promisify(fn, ...args) {
    const handler = (resolve, reject) => response => {
      const error = this._ctx.chrome.runtime.lastError;
      return error ? reject(new Error(error)) : resolve(response);
    };

    return new Promise((resolve, reject) => fn.apply(this, [...args, handler(resolve, reject)]));
  }

  get(key) {
    return this._promisify(this._storage.sync.get, key);
  }

  set(data) {
    return this._promisify(this._storage.sync.set, data);
  }

  usage(key) {
    return this._promisify(this._storage.sync.getBytesInUse, key);
  }

  remove(key) {
    return this._promisify(this._storage.sync.remove, key);
  }

  clear() {
    return this._promisify(this._storage.sync.clear);
  }
}
