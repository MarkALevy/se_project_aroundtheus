// Import component js files
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

//define global variables
const profileModal = document.querySelector("#edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.forms["profile-form"];
const profileEditButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector("[name='name']");
const descriptionInput = document.querySelector("[name='description']");
const cardList = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#add-modal");
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = document.querySelector("[name='place-title']");
const cardImageInput = document.querySelector("[name='img-link']");
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewText = previewModal.querySelector(".modal__preview-text");
const closeButtons = document.querySelectorAll(".modal__close-button");

//Render card function
function renderCard(cardData, method = "prepend") {
  const card = new Card(cardData, "#card-template", imageClick);
  const cardElement = card.getView();
  cardList[method](cardElement);
}

// Initial cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});

//Open & close modal functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  window.addEventListener("keydown", handleEscape);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  window.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("click", handleOverlayClick);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    if (modalOpened) {
      closeModal(modalOpened);
    }
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

//Submit handling functions
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const editedName = nameInput.value;
  const editedDescription = descriptionInput.value;
  profileName.textContent = editedName;
  profileDescription.textContent = editedDescription;
  closeModal(profileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(
    { name: cardTitleInput.value, link: cardImageInput.value },
    "prepend"
  );
  closeModal(addModal);
  addCardForm.reset();
  formValidators["add-card-form"].disableButton();
}

//Handle modal triggers
function imageClick(data) {
  previewImage.setAttribute("src", data.link);
  previewImage.setAttribute("alt", data.name);
  previewText.textContent = data.name;
  openModal(previewModal);
}

profileEditButton.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

addCardButton.addEventListener("click", () => openModal(addModal));
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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
