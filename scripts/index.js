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

console.log(initialCards);

let profileName = document.querySelector(".profile__name").textContent;
let profileDescription = document.querySelector(
  ".profile__description"
).textContent;

function openModal() {
  document.querySelector(".modal").classList.add("modal_opened");
  document.querySelector(".modal__input-name").value = profileName;
  document.querySelector(".modal__input-description").value =
    profileDescription;
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
