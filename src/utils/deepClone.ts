type Indexed<T = unknown> = {
  [k in string | symbol]: T;
};

// eslint-disable-next-line max-len
function cloneDeep<T extends Indexed>(obj: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
  return (function _cloneDeep(item: unknown): unknown {
    if (item === null || typeof item !== "object") {
      return item;
    }

    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    if (Array.isArray(item)) {
      const copy: unknown[] = [];
      item.forEach((el, i) => (copy[i] = _cloneDeep(el)));
      return copy;
    }

    if (item instanceof Set) {
      const copy = new Set<unknown>();
      item.forEach(v => copy.add(_cloneDeep(v)));
      return copy;
    }

    if (item instanceof Map) {
      const copy = new Map<unknown, unknown>();
      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
      return copy;
    }

    if (typeof item === 'object' && item !== null) {
      const copy: Indexed = {};
      Object.getOwnPropertySymbols(item).forEach(s => {
        copy[s.toString()] = _cloneDeep((item as Indexed)[s.toString()]);
      });
      Object.keys(item).forEach(k => {
        copy[k] = _cloneDeep((item as Indexed)[k]);
      });
      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj) as T;
}

export default cloneDeep;
