const popups = document.querySelectorAll('.popup');
const popupOpened = 'popup_opened';

// ---- Функции открытия и закрытия поп-апов
function openButton(popup) {
  enableValidation();
  popup.classList.add(popupOpened);
};
function closeButton(popup) {
  popup.classList.remove(popupOpened);
  const errorList = document.querySelectorAll('.popup__error');
  [...errorList].forEach((item) =>{
    item.textContent = ''
  });
  const inputsList = document.querySelectorAll('.popup__input');
  [...inputsList].forEach((inputs) =>{
    inputs.classList.remove('popup__input_state_invalid');
  });
};

// ---- Закрытие поп-апов по клику на крестик
document.querySelectorAll('.popup__close-button').forEach(button => {
  const popupClose = button.closest('.popup');
  button.addEventListener('click', () => closeButton(popupClose));
});

// ---- Закрытие поп-апов по клику на оверлей
popups.forEach(overlay => {
  const popupClose = overlay.closest('.popup');
  overlay.addEventListener('click', (evt) => {
    if (evt.target !== overlay) return;
    else closeButton(popupClose);
  });
});

// ---- Закрытие поп-апов на кнопку Esc
function closePopups() {
  popups.forEach(function(popup) {
    closeButton(popup);
  });
};
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopups(popups);
  }
});


const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');
const popupCard = document.querySelector('.popup_card');
const popupImage = popupCard.querySelector('.popup__image');
const popupCaption = popupCard.querySelector('.popup__figcaption');

// ---- Карточки
function createCard({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.element__denomination');
  const cardImage = card.querySelector('.element__image');

  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', 'место: ' + name);
  
  cardImage.addEventListener('click', () => {
      openButton(popupCard);
      popupImage.src = link;
      popupImage.alt = name;
      popupCaption.textContent = name;
  }); 

  const cardDelete = card.querySelector('.element__delete');
  cardDelete.addEventListener('click', function () {
    card.remove();
  });
  
  card.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
  });

  return card;
}

function renderCard(data, position = 'append') {
  switch (position) {
    case 'append':
      cards.append(createCard(data));
      break;
    case 'prepend':
      cards.prepend(createCard(data));
      break;
    default:
      break;
  };
};

initialCards.forEach(function (item) {
  renderCard(item);
});


const openButtonRedact = document.querySelector('.profile__edit-button');
const popupRedact = document.querySelector('.popup_redact');
const formRedactElement = popupRedact.querySelector('.popup__form');
const nameInput = formRedactElement.querySelector('.popup__input_type_name');
const jobInput = formRedactElement.querySelector('.popup__input_type_job');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__description');

// ---- Поп-ап редактирования
function handlePopupRedact() {
  openButton(popupRedact);
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
};
openButtonRedact.addEventListener('click', handlePopupRedact);

// ---- Редактирование профиля
function handleFormRedact() {
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  closeButton(popupRedact);
};
formRedactElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleFormRedact();
});


const openButtonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const formAddElement = popupAdd.querySelector('.popup__form');
const namedInput = formAddElement.querySelector('.popup__input_type_named');
const linkInput = formAddElement.querySelector('.popup__input_type_link');

// ---- Поп-ап добавления
function handlePopupAdd() {
  namedInput.value = '';
  linkInput.value = '';
  openButton(popupAdd);
};
openButtonAdd.addEventListener('click', handlePopupAdd);

// ---- Добавления места
function handleFormAdd() {
  preRenderCardNamed = namedInput.value;
  preRenderCardLink = linkInput.value
  renderCard({name: preRenderCardNamed, link: preRenderCardLink}, 'prepend')
  closeButton(popupAdd);
};
formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleFormAdd();
});