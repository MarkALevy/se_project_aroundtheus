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

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".modal__input-name");
const descriptionInput = document.querySelector(".modal__input-description");

function openModal() {
  document.querySelector(".modal").classList.add("modal_opened");
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closeModal() {
  document.querySelector(".modal").classList.remove("modal_opened");
}

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", openModal);

document
  .querySelector(".modal__close-button")
  .addEventListener("click", closeModal);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const editedName = nameInput.value;
  const editedDescription = descriptionInput.value;
  profileName.textContent = editedName;
  profileDescription.textContent = editedDescription;
  closeModal();
}

document
  .querySelector(".modal__save-button")
  .addEventListener("click", handleProfileFormSubmit);

function getCardElement(data) {
  const cardList = document.querySelector(".cards__list");
  const cardElement = document.querySelector("#card").content.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const imagePath = data.link;
  cardTitleEl.textContent = data.name;
  cardImageEl.setAttribute("src", imagePath);
  cardImageEl.setAttribute("alt", data.name);
  cardList.append(cardElement);
}

for (let card of initialCards) {
  getCardElement(card);
}
