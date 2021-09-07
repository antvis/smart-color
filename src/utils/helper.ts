export const random = (a: number = 1, b: number = 0): number => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

export const randomInt = (a: number = 1, b: number = 0): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const clamp = (num: number, boundOne: number, boundTwo: number) => {
  if (!boundTwo) {
    return Math.max(num, boundOne) === boundOne ? num : boundOne;
  }
  if (Math.min(num, boundOne) === num) {
    return boundOne;
  }
  if (Math.max(num, boundTwo) === num) {
    return boundTwo;
  }
  return num;
};

// poor version, but enough
export const cloneDeep = (target: any): any => {
  if (target && typeof target === 'object') {
    const isArray = Array.isArray(target);
    if (isArray) {
      const cloneTarget = (target as []).map((d) => cloneDeep(d));
      return cloneTarget;
    }
    // isObject
    const cloneTarget = {};
    const keys = Object.keys(target);
    keys.forEach((key) => {
      // @ts-ignore
      cloneTarget[key] = cloneDeep(target[key]);
    });
    return cloneTarget;
  }
  return target;
};

export function includes<T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T {
  return coll.includes(el as T);
}
