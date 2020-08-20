/* eslint-disable */

export function afterFn(fn, after) {
  return function() {
    const result = fn && fn.apply(this, arguments);
    after.apply(this, arguments);
    return result;
  };
}
  
export function scrollTop(ele) {
  if (ele) {
    return ele.scrollTop;
  } else {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  }
}

export const SH = __SERVER__ ? 0 :
  (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);

export function throttle(fn, delay) {
  let timer = null;
  let start = Date.now();
  return function() {
    const self = this;
    const args = arguments;
    if (Date.now() - start >= delay) {
      clearTimeout(timer);
      timer = null;
      fn.apply(self, args);
      start = Date.now();
    } else if (!timer) {
      timer = setTimeout(function() {
        clearTimeout(timer);
        timer = null;
        fn.apply(self, args);
        start = Date.now();
      }, delay);
    }
  };
}