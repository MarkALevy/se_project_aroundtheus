export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, method) {
    items.forEach((item) => this._renderer(item, method));
  }

  addItem(element, method = "prepend") {
    this._container[method](element);
  }
}
