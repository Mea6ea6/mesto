const popups = document.querySelectorAll('.popup');


// ---- Функции открытия и закрытия поп-апов
function popupOpeneButton(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};
function popupCloseButton(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};


// ---- Закрытие поп-апов по клику на крестик
document.querySelectorAll('.popup__close-button').forEach(button => {
  const popupClose = button.closest('.popup');
  button.addEventListener('click', () => popupCloseButton(popupClose));
});

// ---- Закрытие поп-апов по клику на оверлей
popups.forEach(overlay => {
  overlay.addEventListener('click', (evt) => {
    if (evt.target !== overlay) return;
    else popupCloseButton(document.querySelector('.popup_opened'));
  });
});

// ---- Закрытие поп-апов на кнопку Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    popupCloseButton(document.querySelector('.popup_opened'));
  }
}


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
      popupOpeneButton(popupCard);
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
const popupRedactSubmitButton = formRedactElement.querySelector('.popup__submit-button');
const nameOutput = document.querySelector('.profile__name');
const jobOutput = document.querySelector('.profile__description');

// ---- Поп-ап редактирования
function handlePopupRedact() {
  popupOpeneButton(popupRedact);
  clearFormErrors(formRedactElement, config);
  disableButton(popupRedactSubmitButton, config);
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
};
openButtonRedact.addEventListener('click', handlePopupRedact);

// ---- Редактирование профиля
function handleFormRedact() {
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  popupCloseButton(popupRedact);
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
const popupAddSubmitButton = formAddElement.querySelector('.popup__submit-button');

// ---- Поп-ап добавления
function handlePopupAdd() {
  popupOpeneButton(popupAdd);
  clearFormErrors(formAddElement, config);
  disableButton(popupAddSubmitButton, config);
  formAddElement.reset();
};
openButtonAdd.addEventListener('click', handlePopupAdd);

// ---- Добавления места
function handleFormAdd() {
  preRenderCardNamed = namedInput.value;
  preRenderCardLink = linkInput.value;
  renderCard({name: preRenderCardNamed, link: preRenderCardLink}, 'prepend');
  popupCloseButton(popupAdd);
};
formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleFormAdd();
});