// Import files
import "./index.css";
import { ApiConfig, config, initialCards } from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

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

//define Api variable
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f0d69ab2-8bea-4a7d-bdd5-7a7d550b52c4",
    "Content-Type": "application/json",
  },
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
// api.getInitialCards();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", imageClick);
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement, "append");
    },
  },
  ".cards__list"
);

cardSection.renderItems();

//Submit handling functions

function handleProfileFormSubmit(input) {
  userInfo.setUserInfo(input);
  profileEditPopup.close();
}

function handleAddCardFormSubmit(input) {
  const cardElement = createCard(input);
  cardSection.addItem(cardElement, "prepend");
  addCardPopup.close();
  addCardForm.reset();
  formValidators["add-card-form"].disableButton();
}

// create instances for modals - preview, profile-edit, add-card
const previewPopup = new PopupWithImage(previewModal);

const profileEditPopup = new PopupWithForm(
  profileModal,
  handleProfileFormSubmit
);

const addCardPopup = new PopupWithForm(addModal, handleAddCardFormSubmit);
// call setEventlisteners for each popup

previewPopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();

//handle modal triggers
function imageClick(data) {
  previewPopup.open(data);
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
