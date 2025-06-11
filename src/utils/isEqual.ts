type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is unknown[] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }
    for (const key in lhs) {
        if (!Object.prototype.hasOwnProperty.call(lhs, key)) {
            continue;
        }
        const l = lhs[key];
        const r = rhs[key];
        if (isArrayOrObject(l) && isArrayOrObject(r)) {
            if (!isEqual(l as PlainObject, r as PlainObject)) {
                return false;
            }
        } else if (l !== r) {
            return false;
        }
    }
    return true;
}

export default isEqual;
