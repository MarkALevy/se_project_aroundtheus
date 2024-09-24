// // Initial cards
// export const initialCards = [
//   {
//     cardName: "Yosemite Valley",
//     cardLink:
//       "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     cardName: "Lake Louise",
//     cardLink:
//       "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     cardName: "Bald Mountains",
//     cardLink:
//       "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     cardName: "Latemar",
//     cardLink:
//       "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     cardName: "Vanoise National Park",
//     cardLink:
//       "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     cardName: "Lago di Braies",
//     cardLink:
//       "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];

//validation variables
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Api variables
export const apiConfig = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4c60eaef-36e2-498d-8440-907e9f786db6",
    "Content-Type": "application/json",
  },
};
