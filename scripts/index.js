import { initialCards } from "./cards.js";
import { config } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popups = document.querySelectorAll(".popup");


// ---- Функции открытия и закрытия поп-апов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

// ---- Закрытие поп-апов по клику на крестик
document.querySelectorAll(".popup__close-button").forEach((button) => {
  const popupClose = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popupClose));
});

// ---- Закрытие поп-апов по клику на оверлей
popups.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
    if (evt.target !== overlay) return;
    else closePopup(document.querySelector(".popup_opened"));
  });
});

// ---- Закрытие поп-апов на кнопку Esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}


const cards = document.querySelector(".elements");
const popupCard = document.querySelector(".popup_card");
const popupImage = popupCard.querySelector(".popup__image");
const popupCaption = popupCard.querySelector(".popup__figcaption");

// ---- Карточки

function handleClickOpen(_data) {
  popupCaption.textContent = _data.name;
  popupImage.setAttribute("src", _data.link);
  popupImage.setAttribute("alt", "место: " + _data.name);
  openPopup(popupCard);
}

function handleClickDelete(cardElement) {
  cardElement.remove();
}

function handleClickLike(evt) {
  evt.target.classList.toggle("element__like_active");
}

function renderCard(data, position = "append") {
  const cardElement = new Card(
    { data, handleClickOpen, handleClickDelete, handleClickLike },
    "#card-template"
  ).createCard();

  switch (position) {
    case "append":
      cards.append(cardElement);
      break;
    case "prepend":
      cards.prepend(cardElement);
      break;
    default:
      break;
  }
}

initialCards.forEach(function (item) {
  renderCard(item);
});


const openButtonRedact = document.querySelector(".profile__edit-button");
const popupRedact = document.querySelector(".popup_redact");
const formRedactElement = popupRedact.querySelector(".popup__form");
const nameInput = formRedactElement.querySelector(".popup__input_type_name");
const jobInput = formRedactElement.querySelector(".popup__input_type_job");
const nameOutput = document.querySelector(".profile__name");
const jobOutput = document.querySelector(".profile__description");

// ---- Поп-ап редактирования
function handlePopupRedact() {
  openPopup(popupRedact);
  validationProfile.clearFormErrors();
  validationProfile.disableButton();
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
}
openButtonRedact.addEventListener("click", handlePopupRedact);

// ---- Редактирование профиля
function handleFormRedact() {
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  closePopup(popupRedact);
}
formRedactElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleFormRedact();
});


const openButtonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const formAddElement = popupAdd.querySelector(".popup__form");
const namedInput = formAddElement.querySelector(".popup__input_type_named");
const linkInput = formAddElement.querySelector(".popup__input_type_link");

// ---- Поп-ап добавления
function handlePopupAdd() {
  openPopup(popupAdd);
  validationCard.clearFormErrors();
  validationCard.disableButton();
  formAddElement.reset();
}
openButtonAdd.addEventListener("click", handlePopupAdd);

// ---- Добавления места
function handleFormAdd() {
  const preRenderCardNamed = namedInput.value;
  const preRenderCardLink = linkInput.value;
  renderCard({ name: preRenderCardNamed, link: preRenderCardLink }, "prepend");
  closePopup(popupAdd);
}
formAddElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleFormAdd();
});


const validationProfile = new FormValidator(config, formRedactElement);
validationProfile.enableValidation();

const validationCard = new FormValidator(config, formAddElement);
validationCard.enableValidation();