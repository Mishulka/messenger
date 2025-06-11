type Indexed<T = unknown> = {
  [key in string]: T;
};
function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const key in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, key)) {
      continue;
    }
    if (
      typeof rhs[key] === 'object' && rhs[key] !== null &&
      typeof lhs[key] === 'object' && lhs[key] !== null
    ) {
      lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
    } else {
      lhs[key] = rhs[key];
    }
  }
  return lhs;
}

export default merge;
