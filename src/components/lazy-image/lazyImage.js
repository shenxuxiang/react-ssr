const SH = __SERVER__ ? 0 :
  (window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight);

const SW = __SERVER__ ? 0 :
  (window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth);

function throttle(fn, delay) {
  let start = 0;
  let timer = null;
  return function() {
    const args = arguments;
    const self = this;
    if (Date.now() - start >= delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(self, args);
      start = Date.now();
    } else if (!timer) {
      timer = setTimeout(function() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        fn.apply(self, args);
        start = Date.now();
      }, delay);
    }
  }
}

function LazyImage(container) {
  this.container = container;
  this.map = new Map();
  this.timer = null;
  this.offsetTop = -200;
  this.offsetBottom = 1.3 * SH;
  this.offsetLeft = -100;
  this.offsetRight = 1.5 * SW;
  if (container instanceof HTMLElement) {
    this.offsetBottom = 1.3 * (container.clientHeight);
    this.offsetRight = 1.5 * (container.clientWidth);
  }
}

LazyImage.prototype.add = function(node, src) {
  this.map.set(node, src);
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
  // 初始化；当 img 添加完成后开始计算 img 的位置
  // 决定是否展示
  this.timer = setTimeout(() => this.each(), 60);
}

LazyImage.prototype.each = function() {
  const map = [...this.map.entries()];
  const len = map.length;
  let x;
  let y;
  if (this.container === window) {
    x = 0;
    y = 0;
  } else {
    ({ top: y, left: x } = this.container.getBoundingClientRect());
  }

  for (let i = 0; i < len; i++) {
    const node = map[i][0];
    const src = map[i][1];
    const { top: distY, left: distX } = node.getBoundingClientRect();
    const top = distY - y;
    const left = distX - x;
    if (
      top < this.offsetBottom &&
      top > this.offsetTop &&
      left < this.offsetRight &&
      left > this.offsetLeft
    ) {
      node.src = src;
      this.map.delete(node);
    }
  }
}


LazyImage.prototype.remove = function(node) {
  this.map.delete(node);
}

LazyImage.prototype.run = function() {
  this.onScroll = throttle(() => {
    this.each();
  }, 300);
  this.container.addEventListener('scroll', this.onScroll, false);
}

LazyImage.prototype.destory = function() {
  this.map.clear();
  this.container.removeEventListener('scroll', this.onScroll, false);
  stack.delete(this.container);
}

const stack = new WeakMap();

export default function(container) {
  const value = stack.get(container);
  if (value) return value;

  const lazy = new LazyImage(container);
  lazy.run();
  stack.set(container, lazy);
  return lazy;
}
