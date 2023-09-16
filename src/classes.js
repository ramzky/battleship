class Model {
  constructor(target) {
    this.proxy = new Proxy(target, ((callback) => {
      return {
        get(target, prop, receiver) {
          return Reflect.get(...arguments);
        },
        set(target, prop, value, receiver) {
          let oldValue = target[prop];
          let tmp = Reflect.set(target, prop, value, receiver);
          if (tmp) callback(value, oldValue);
          return tmp;
        }
      }
    })(this.#execute.bind(this)));
  }
  #callbacks = [];
  #execute(value, oldValue) {
    if (this.#callbacks.length > 0)
      this.#callbacks.forEach((cb) => cb(value, oldValue));
  }
  add(fn) {
    if (fn) this.#callbacks.push(fn);
  }
  reset() {
    this.#callbacks.splice(0);
  }
}
class View {
  constructor(container) {
    this.container = container;
  }
  #callbacks = [];
  #execute(value, oldValue) {
    if (this.#callbacks.length > 0)
      this.#callbacks.forEach((cb) => cb(this.container, value, oldValue));
  }
  onChange(fn) {
    this.#callbacks.push(fn);
    return this;
  }
  listenTo(model) {
    model.add(this.#execute.bind(this));
    return this;
  }
  unsubscribe(model) {
    model.reset();
  }
  reset() {
    this.#callbacks.splice(0);
  }
  el(str, fn, opt) {
    this.container.addEventListener(str, fn, opt);
  }
  rl(str, fn, opt) {
    this.container.removeEventListener(str, fn, opt);
  }
}

export {
  Model,
  View
}