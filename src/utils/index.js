export function isType (type) {
  return function(data) {
    return Object.prototype.toString.call(data) === `[object ${type}]`;
  }
}

export const isArray = isType('Array');

export const isObject = isType('Object');

export const isMap = isType('Map');

export const isSet = isType('Set');

export const isFormata = isType('Formata');

export function isEmpty(data) {
  if (!data) return true;
  if (isArray(data)) {
    return data.length === 0;
  } else if (isObject(data)) {
    return Object.keys(data).length === 0;
  } else if (isSet(data) || isMap(data)) {
    return data.size === 0;
  } else if (data instanceof NodeList) {
    return data.length === 0;
  }
  return false;
}