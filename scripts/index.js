const popupOpened = "popup_opened";
// ---- Функции открытия и закрытия поп-апов
function openButton(popup) {
  popup.classList.add(popupOpened);
}
function closeButton(popup) {
  popup.classList.remove(popupOpened);
}
document.querySelectorAll('.popup__close-button').forEach(button => {
  const popupClose = button.closest('.popup');
  button.addEventListener('click', () => closeButton(popupClose));
}); 


const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");
const popupCard = document.querySelector(".popup_card");
const popupImage = popupCard.querySelector(".popup__image");
const popupCaption = popupCard.querySelector(".popup__figcaption");
// ---- Карточки
function createCard({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".element__denomination");
  const cardImage = card.querySelector(".element__image");

  cardTitle.textContent = name;
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", "место: " + name);
  
  cardImage.addEventListener("click", () => {
      openButton(popupCard);
      popupImage.src = link;
      popupImage.alt = name;
      popupCaption.textContent = name;
  }); 

  const cardDelete = card.querySelector(".element__delete");
  cardDelete.addEventListener("click", function () {
    card.remove();
  });
  
  card.querySelector(".element__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
  });

  return card;
}

function renderCard(data, position = "append") {
  switch (position) {
    case "append":
      cards.append(createCard(data));
      break;
    case "prepend":
      cards.prepend(createCard(data));
      break;
    default:
      break;
  }
  console.log(data)
};

initialCards.forEach(function (item) {
  renderCard(item);
});


const openButtonRedact = document.querySelector(".profile__edit-button");
const popupRedact = document.querySelector(".popup_redact");
const formRedactElement = popupRedact.querySelector(".popup__form");
const nameInput = formRedactElement.querySelector(".popup__field_type_name");
const jobInput = formRedactElement.querySelector(".popup__field_type_job");
const nameOutput = document.querySelector(".profile__name");
const jobOutput = document.querySelector(".profile__description");
// ---- Поп-ап редактирования
openButtonRedact.addEventListener("click", () => {
  openButton(popupRedact);
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
});
// ---- Редактирование профиля
formRedactElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  closeButton(popupRedact);
});


const openButtonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const formAddElement = popupAdd.querySelector(".popup__form");
const namedInput = formAddElement.querySelector(".popup__field_type_named");
const linkInput = formAddElement.querySelector(".popup__field_type_link");
// ---- Поп-ап добавления
openButtonAdd.addEventListener("click", () => {
  namedInput.value = "";
  linkInput.value = "";
  openButton(popupAdd);
});
// ---- Добавления места
formAddElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderCard(namedInput.value, linkInput.value, "prepend");
  closeButton(popupAdd);
});