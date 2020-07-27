export default class LocalStorage {
  constructor(key) {
    this._appKey = key || 'dictionary-chrome-plugin'
    this._storage = window.localStorage
  }

  get(key) {
    const { _storage, _appKey } = this
    return JSON.parse(_storage.getItem(_appKey) || '{}')[key]
  }
  save(key, value) {
    const { _storage, _appKey } = this
    const data = JSON.parse(_storage.getItem(_appKey) || '{}');
    (!(data[key] = `${value}`) || !data[key].length) && (delete data[key])
    _storage.setItem(_appKey, JSON.stringify(data))

  }
}
