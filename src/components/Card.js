export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this.cardName = data.cardName;
    this.cardLink = data.cardLink;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_enabled");
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardTitleEl.textContent = this.cardName;
    this._cardImageEl.setAttribute("src", this.cardLink);
    this._cardImageEl.setAttribute("alt", this.cardName);
    this._setEventListeners();
    return this._cardElement;
  }
}
