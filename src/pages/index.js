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
const nameInput = document.querySelector("[name='name']");
const descriptionInput = document.querySelector("[name='description']");
const cardList = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-button");
const addModal = "#add-modal";
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = document.querySelector("[name='place-title']");
const cardImageInput = document.querySelector("[name='img-link']");
const previewModal = "#preview-modal";

//add card section to DOM & add initial cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", imageClick);
      const cardElement = card.getView();
      cardList.append(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

//Submit handling functions
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const UserInfoInput = {
    name: nameInput.value,
    job: descriptionInput.value,
  };
  userInfo.setUserInfo(UserInfoInput);
  profileEditPopup.close();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: cardTitleInput.value, link: cardImageInput.value };
  const card = new Card(cardData, "#card-template", imageClick);
  const cardElement = card.getView();
  cardSection.addItem(cardElement, "prepend");
  addCardPopup.close();
  addCardForm.reset();
  formValidators["add-card-form"].disableButton();
}

// Create user info instance
const userInfo = new UserInfo({
  name: profileName,
  job: profileDescription,
});

// create instances for modals - preview, profile-edit & add-card
const previewPopup = new PopupWithImage(previewModal);

const profileEditPopup = new PopupWithForm(
  profileModal,
  handleProfileFormSubmit
);

const addCardPopup = new PopupWithForm(addModal, handleAddCardFormSubmit);

//handle modal triggers
function imageClick(data) {
  previewPopup.open(data);
}

profileEditButton.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  nameInput.value = userInfo.name.textContent;
  descriptionInput.value = userInfo.job.textContent;
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
