type StringIndexed = Record<string, any>;

function queryStringify(data: StringIndexed): string | never {
  // Проверка что входные данные - объект
  if (typeof data !== 'object' || data === null) {
    throw new Error('input must be an object');
  }

  const params: string[] = [];

  function processObject(obj: any, prefix: string = ''): void {
    if (Array.isArray(obj)) {
      // Обработка массивов
      obj.forEach((value, index) => {
        const key = `${prefix}[${index}]`;
        if (typeof value === 'object' && value !== null) {
          processObject(value, key);
        } else {
          params.push(`${key}=${encodeURIComponent(value)}`);
        }
      });
    } else if (typeof obj === 'object' && obj !== null) {
      // Обработка объектов
      Object.keys(obj).forEach((key) => {
        const newPrefix = prefix ? `${prefix}[${key}]` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          processObject(obj[key], newPrefix);
        } else {
          params.push(`${newPrefix}=${encodeURIComponent(obj[key])}`);
        }
      });
    } else {
      // Примитивы
      params.push(`${prefix}=${encodeURIComponent(obj)}`);
    }
  }

  processObject(data);
  return params.join('&');
}

export default queryStringify;

