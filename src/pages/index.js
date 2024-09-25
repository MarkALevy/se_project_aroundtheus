// Import files
import "./index.css";
import { apiConfig, config, initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

//define global variables
const profileModal = "#profile-modal";
const profileName = ".profile__name";
const profileDescription = ".profile__description";
const profileImage = ".profile__image";
const profileImageEl = document.querySelector(profileImage);
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const addModal = "#add-modal";
const addCardForm = document.forms["add-card-form"];
const previewModal = "#preview-modal";
const deleteModal = "#delete-modal";

const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: apiConfig.headers,
});

// Create user info instance
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
  UserImg: profileImage,
});

//receive user info
api.getUserInfo().then((res) => {
  userInfo.setUserInfo({
    userName: res.name,
    userJob: res.about,
  });
  profileImageEl.setAttribute("src", res.avatar);
});

//add card section to DOM & add initial cards

const cardSection = new Section(
  {
    renderer: (cardData) => {
      if (cardData.link) {
        cardData.cardLink = cardData.link;
      }
      if (cardData.name) {
        cardData.cardName = cardData.name;
      }

      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement, "append");
    },
  },
  ".cards__list"
);

api.getInitialCards().then((cards) => {
  cardSection.renderItems(cards);
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    imageClick,
    deleteClick,
    likeClick
  );
  return card.getView();
}

//Submit handling functions

function handleProfileFormSubmit(input) {
  userInfo.setUserInfo(input);
  api.setUserInfo(input);
  profileEditPopup.close();
}

function handleAddCardFormSubmit(input) {
  const cardElement = createCard(input);
  cardSection.addItem(cardElement, "prepend");
  api.addNewCard(input);
  addCardPopup.close();
  addCardForm.reset();
  formValidators["add-card-form"].disableButton();
}

function handleDeleteCardFormSubmit(cardId, card) {
  api.deleteCard(cardId).then(() => {
    card.deleteCard();
    deleteCardPopup.close();
  });
}

function likeClick(cardId, card) {
  if (!card.isLiked) {
    api.likeCard(cardId).then((res) => {
      card.handleLikeIcon();
      card.isLiked = res.isLiked;
    });
  } else {
    api.removeLike(cardId).then((res) => {
      card.handleLikeIcon();
      card.isLiked = res.isLiked;
    });
  }
}

// create instances for modals - preview, profile-edit, add-card
const previewPopup = new PopupWithImage(previewModal);

const profileEditPopup = new PopupWithForm(
  profileModal,
  handleProfileFormSubmit
);

const addCardPopup = new PopupWithForm(addModal, handleAddCardFormSubmit);
// call setEventlisteners for each popup

const deleteCardPopup = new PopupWithConfirm(
  deleteModal,
  handleDeleteCardFormSubmit
);

previewPopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();

//handle modal triggers
function imageClick(data) {
  previewPopup.open(data);
}

function deleteClick(cardId, card) {
  deleteCardPopup.open();
  deleteCardPopup.card = card;
  deleteCardPopup.cardId = cardId;
}

profileEditButton.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  const input = userInfo.getUserInfo();
  profileEditPopup.setInputValues(input);
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Validation

const formValidators = {};
const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
