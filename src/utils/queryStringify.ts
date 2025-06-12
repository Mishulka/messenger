type StringIndexed = Record<string, unknown>;

function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object' || data === null) {
    throw new Error('input must be an object');
  }

  const params: string[] = [];

  function processObject(obj: unknown, prefix: string = ''): void {
    if (Array.isArray(obj)) {
      obj.forEach((value, index) => {
        const key = `${prefix}[${index}]`;
        if (typeof value === 'object' && value !== null) {
          processObject(value, key);
        } else {
          params.push(`${key}=${encodeURIComponent(String(value))}`);
        }
      });
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => {
        const newPrefix = prefix ? `${prefix}[${key}]` : key;
        const val = (obj as StringIndexed)[key];
        if (typeof val === 'object' && val !== null) {
          processObject(val, newPrefix);
        } else {
          params.push(`${newPrefix}=${encodeURIComponent(String(val))}`);
        }
      });
    }
  }

  processObject(data);
  return params.join('&');
}

export default queryStringify;

