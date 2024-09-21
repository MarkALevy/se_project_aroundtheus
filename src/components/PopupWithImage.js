import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._popupText = this._popupElement.querySelector(".modal__preview-text");
  }
  open({ cardName, cardLink }) {
    this._popupImage.setAttribute("src", cardLink);
    this._popupImage.setAttribute("alt", cardName);
    this._popupText.textContent = cardName;
    super.open();
  }
}
