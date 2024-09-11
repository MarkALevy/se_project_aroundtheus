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

const profileModal = document.querySelector("#edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.querySelector(".modal__form");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector("#profile-close");
const nameInput = document.querySelector("[name='name']");
const descriptionInput = document.querySelector("[name='description']");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card").content;
const addCardButton = document.querySelector(".profile__add-button");
const addModal = document.querySelector("#add-modal");
const addCloseButton = document.querySelector("#add-close");

console.log(cardTemplate);

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const editedName = nameInput.value;
  const editedDescription = descriptionInput.value;
  profileName.textContent = editedName;
  profileDescription.textContent = editedDescription;
  closeModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = data.name;
  cardImageEl.setAttribute("src", data.link);
  cardImageEl.setAttribute("alt", data.name);
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});
addCardButton.addEventListener("click", () => openModal(addModal));
profileCloseButton.addEventListener("click", () => closeModal(profileModal));
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCloseButton.addEventListener("click", () => closeModal(addModal));

for (let card of initialCards) {
  const cardElement = getCardElement(card);
  cardList.append(cardElement);
}
