// Import files
import "./index.css";
import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//define global variables
const profileModal = "#profile-modal";
const profileName = ".profile__name";
const profileDescription = ".profile__description";
const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector("[name='userName']");
const descriptionInput = document.querySelector("[name='userJob']");
const cardList = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-button");
const addModal = "#add-modal";
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = document.querySelector("[name='cardName']");
const cardImageInput = document.querySelector("[name='cardLink']");
const previewModal = "#preview-modal";

//add card section to DOM & add initial cards

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
  profileEditPopup.setInputValues(input);
  userInfo.setUserInfo(input);
  profileEditPopup.close();
}

function handleAddCardFormSubmit(input) {
  addCardPopup.setInputValues(input);
  const cardElement = createCard(input);
  cardSection.addItem(cardElement, "prepend");
  addCardPopup.close();
  addCardForm.reset();
  formValidators["add-card-form"].disableButton();
}

// Create user info instance
const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileDescription,
});

// create instances for modals - preview, profile-edit & add-card
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
  nameInput.value = userInfo.userName.textContent;
  descriptionInput.value = userInfo.userJob.textContent;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => addCardPopup.open());

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
