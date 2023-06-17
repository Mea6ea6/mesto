const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");
// Карточки
function createCard(name, link, position = "append") {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".element__denomination");
  const cardImage = card.querySelector(".element__image");
  
  cardTitle.textContent = name;
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", "место: " + name);

  const cardDelete = card.querySelector(".element__delete");
  cardDelete.addEventListener("click", function () {
    card.remove();
  });
  
  card.querySelector(".element__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
  
  switch (position) {
    case "append":
      cards.append(card);
      break;
    case "prepend":
      cards.prepend(card);
      break;
    default:
      break;
  }
}
initialCards.forEach((item, index) => {
  createCard(initialCards[index].name, initialCards[index].link);
});


const popupOpened = "popup_opened";
// Функции открытия и закрытия поп-апов
function buttonOpen(popup) {
  popup.classList.add(popupOpened);
}
function buttonClose(popup) {
  popup.classList.remove(popupOpened);
}


const openButtonRedact = document.querySelector(".profile__edit-button");
const popupRedact = document.querySelector(".popup_redact");
const closeButtonRedact = popupRedact.querySelector(".popup__close-button");
const formRedactElement = popupRedact.querySelector(".popup__form");
let nameInput = formRedactElement.querySelector(".popup__field_type_name");
let jobInput = formRedactElement.querySelector(".popup__field_type_job");
let nameOutput = document.querySelector(".profile__name");
let jobOutput = document.querySelector(".profile__description");
// Поп-ап редактирования
openButtonRedact.addEventListener("click", () => {
  buttonOpen(popupRedact);
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
});
closeButtonRedact.addEventListener("click", () => {
  buttonClose(popupRedact);
});
// Редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  buttonClose(popupRedact);
}
formRedactElement.addEventListener("submit", handleFormSubmit);


const openButtonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const closeButtonAdd = popupAdd.querySelector(".popup__close-button");
const formAddElement = popupAdd.querySelector(".popup__form");
let namedInput = formAddElement.querySelector(".popup__field_type_named");
let linkInput = formAddElement.querySelector(".popup__field_type_link");
// Поп-ап добавления
openButtonAdd.addEventListener("click", () => {
  namedInput.value = "";
  linkInput.value = "";
  buttonOpen(popupAdd);
});
closeButtonAdd.addEventListener("click", () => {
  buttonClose(popupAdd);
});
// Добавления места
formAddElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  createCard(namedInput.value, linkInput.value, "prepend");
  buttonClose(popupAdd);
});


const openButtonImage = document.querySelectorAll(".element__image");
const popupCard = document.querySelector(".popup_card");
const closeButtonCard = popupCard.querySelector(".popup__close-button");
const popupImage = popupCard.querySelector(".popup__image");
const popupCaption = popupCard.querySelector(".popup__figcaption");
// Открытие карточки
openButtonImage.forEach((cardImagePreview) => {
  cardImagePreview.addEventListener("click", () => {
      buttonOpen(popupCard);
      // popupImage.src = initialCards.link;
      // popupImage.alt = initialCards.name;
      popupCaption.textContent = initialCards.name;
    });
});
closeButtonCard.addEventListener("click", () => {
  buttonClose(popupCard);
});