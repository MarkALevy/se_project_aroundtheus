import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._popupText = this._popupElement.querySelector(".modal__preview-text");
  }
  open({ name, link }) {
    this._popupImage.setAttribute("src", link);
    this._popupImage.setAttribute("alt", name);
    this._popupText.textContent = name;
    super.open();
  }
}
