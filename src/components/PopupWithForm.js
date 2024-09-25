import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputSelector = ".modal__input";
    this._inputList = [
      ...this._popupForm.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._popupForm.querySelector(".modal__save-button");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Saving...";
      this._handleFormSubmit(this._getInputValues(), this._submitButton);
    });
    super.setEventListeners();
  }
}
