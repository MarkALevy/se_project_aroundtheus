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
const profileImgModal = "#edit-profile-image-modal";
const profileName = ".profile__name";
const profileDescription = ".profile__description";
const profileImage = ".profile__image";
const profileImageEl = document.querySelector(profileImage);
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditImageButton = document.querySelector(
  ".profile__image__edit-button"
);
const addCardButton = document.querySelector(".profile__add-button");
const addModal = "#add-modal";
const editProfileImgForm = document.forms["edit-profile-image-form"];
const addCardForm = document.forms["add-card-form"];
const previewModal = "#preview-modal";
const deleteModal = "#delete-modal";

const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: apiConfig.headers,
});

// Create user info instance
const userInfo = new UserInfo(
  {
    userName: profileName,
    userJob: profileDescription,
  },
  profileImageEl
);

//receive user info
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      userName: res.name,
      userJob: res.about,
      userImg: res.avatar,
    });
  })
  .catch((err) => {
    console.error("Failed to receive user info", err);
  });

//add card section to DOM & add initial cards

const cardSection = new Section(
  {
    renderer: (cardData, method) => {
      if (cardData.link) {
        cardData.cardLink = cardData.link;
      }
      if (cardData.name) {
        cardData.cardName = cardData.name;
      }

      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement, method);
    },
  },
  ".cards__list"
);

api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards, "append");
  })
  .catch((err) => {
    console.error("Failed to receive card data", err);
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

function handleProfileFormSubmit(input, button) {
  api
    .setUserInfo(input)
    .then((data) => {
      userInfo.setUserInfo({
        userName: data.name,
        userJob: data.about,
        userImg: data.avatar,
      });
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error("Failed to save changes in user info", err);
    })
    .finally(() => {
      button.textContent = "Save";
    });
}

function handleProfileImgFormSubmit(input, button) {
  api
    .editProfileImg(input.imageLink)
    .then((data) => {
      if (data && data.avatar) {
        userInfo.setUserInfo({
          userName: data.name,
          userJob: data.about,
          userImg: data.avatar,
        });
      }
      profileEditImagePopup.close();
      editProfileImgForm.reset();
      formValidators["edit-profile-image-form"].disableButton();
    })
    .catch((err) => {
      console.error("Failed to update profile image:", err);
    })
    .finally(() => {
      button.textContent = "Save";
    });
}

function handleAddCardFormSubmit(input, button) {
  api
    .addNewCard(input)
    .then((data) => {
      cardSection.renderItems([data], "prepend");
      addCardPopup.close();
      addCardForm.reset();
      formValidators["add-card-form"].disableButton();
    })
    .catch((err) => {
      console.error("Failed to add new card", err);
    })
    .finally(() => {
      button.textContent = "Create";
    });
}

function handleDeleteCardFormSubmit(cardId, card) {
  api
    .deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error("Failed to delete card", err);
    });
}

function likeClick(cardId, card) {
  if (!card.isLiked) {
    api
      .likeCard(cardId)
      .then((res) => {
        card.handleLikeIcon();
        card.isLiked = res.isLiked;
      })
      .catch((err) => {
        console.error("Failed to like card", err);
      });
  } else {
    api
      .removeLike(cardId)
      .then((res) => {
        card.handleLikeIcon();
        card.isLiked = res.isLiked;
      })
      .catch((err) => {
        console.error("Failed to remove like from card", err);
      });
  }
}

// create instances for modals - preview, profile-edit, edit-profile-image, add-card, delete-card,
const previewPopup = new PopupWithImage(previewModal);

const profileEditPopup = new PopupWithForm(
  profileModal,
  handleProfileFormSubmit
);

const profileEditImagePopup = new PopupWithForm(
  profileImgModal,
  handleProfileImgFormSubmit
);

const addCardPopup = new PopupWithForm(addModal, handleAddCardFormSubmit);
// call setEventlisteners for each popup

const deleteCardPopup = new PopupWithConfirm(
  deleteModal,
  handleDeleteCardFormSubmit
);

previewPopup.setEventListeners();
profileEditPopup.setEventListeners();
profileEditImagePopup.setEventListeners();
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

profileEditImageButton.addEventListener("click", () => {
  profileEditImagePopup.open();
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
